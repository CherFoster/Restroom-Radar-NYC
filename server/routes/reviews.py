from flask import request, make_response
from flask_restful import Resource
from models.models import Review
from config import api, db

class Reviews(Resource):
    def get(self):
        reviews = [review.to_dict() for review in Review.query.all()]
        return make_response(reviews, 200)

    def post(self):
        request_json = request.get_json()

        content = request_json.get('content')
        user_id = request_json.get('user_id')
        bathroom_id = request_json.get('bathroom_id')

        review = Review(
            content=content,
            user_id=user_id,
            bathroom_id=bathroom_id
        )

        db.session.add(review)
        db.session.commit()

        return make_response(review.to_dict(), 201)

api.add_resource(Reviews, '/api/reviews')

class ReviewsResource(Resource):
    def get(self, id):
        reviews = Review.query.filter_by(id=id).first()
        if not reviews:
            return make_response({'message': 'There are no reviews'}, 404)
            
        return reviews.to_dict(), 200
    
    def patch(self, id):
        request_json = request.get_json()

        review = Review.query.get(id)
        if not review:
            return make_response({'message': 'Review not found'}, 404)

        # Update the review attributes based on the request JSON
        review.content = request_json.get('content')

        db.session.commit()

        return make_response({'message': 'Review updated successfully'}, 200)

    def delete(self, id):
        review = Review.query.get(id)
        if not review:
            return make_response({'message': 'Review not found'}, 404)

        db.session.delete(review)
        db.session.commit()

        return make_response({'message': 'Review deleted successfully'}, 200)


api.add_resource(ReviewsResource, '/api/reviews/<int:id>')