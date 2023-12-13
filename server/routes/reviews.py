from flask import session, request, make_response
from flask_restful import Resource
from models.models import Review, User, Bathroom
from config import api, db
from werkzeug.exceptions import NotFound

class Reviews(Resource):
    def get(self):
        reviews = Review.query.all()
        review_dicts = [review.to_dict() for review in reviews]
        return review_dicts, 200

    def post(self):
        user_id = session.get("user_id")
        if not user_id:
            return make_response({"error": "Unauthorized"}, 401)
        request_json = request.get_json()
        content = request_json.get("content")
        bathroom_id = request_json.get("bathroom_id")

        review = Review(
            content=content, 
            user_id=user_id, 
            bathroom_id=bathroom_id
        )

        db.session.add(review)
        db.session.commit()

        return review.to_dict(), 201

api.add_resource(Reviews, '/api/reviews')

class ReviewsByBathroom(Resource):
    def get(self, bathroom_id):
        bathroom = Bathroom.query.filter_by(id=bathroom_id).first()
        if not bathroom:
            raise NotFound

        reviews = Review.query.filter_by(bathroom_id=bathroom_id).all()
        review_list = [review.to_dict() for review in reviews]
        return make_response(review_list, 200)

api.add_resource(ReviewsByBathroom, '/api/bathrooms/<int:bathroom_id>/reviews')

class ReviewsResource(Resource):
    def get(self, id):
        reviews = Review.query.filter_by(id=id).first()
        if not reviews:
            return make_response({'message': 'There are no reviews'}, 404)
        return reviews.to_dict(), 200
    
    def patch(self, id):
        review = Review.query.filter_by(id=id).first()
        if review:
            if review.user_id == session.get('user_id'):
                try:
                    data = request.get_json()
                    for key in data.keys():
                        if key != "user_id" and key != "bathroom_id" and hasattr(review, key):
                            setattr(review, key, data[key])
                    db.session.add(review)
                    db.session.commit()
                    return review.to_dict(), 200
                except ValueError as err:
                    return {'error': str(err)}, 422
            else:
                return {'error': 'Unauthorized'}, 401
        else:
            return {'error': 'review does not exist'}, 401

    def delete(self, id):
        review = Review.query.filter_by(id=id).first()
        if not review:
            return make_response({'message': 'Review not found'}, 404)

        db.session.delete(review)
        db.session.commit()

        return make_response({'message': 'Review deleted successfully'}, 200)


api.add_resource(ReviewsResource, '/api/reviews/<int:id>')