from flask import request, make_response
from flask_restful import Resource
from models.models import Review, User, Bathroom
from config import api, db
from werkzeug.exceptions import NotFound

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


class ReviewsByBathroom(Resource):
    def get(self, bathroom_id):
        bathroom = Bathroom.query.filter_by(id=bathroom_id).first()
        if not bathroom:
            raise NotFound

        reviews = Review.query.filter_by(bathroom_id=bathroom_id).all()
        review_list = [review.to_dict() for review in reviews]
        return make_response(review_list, 200)

api.add_resource(ReviewsByBathroom, '/api/bathrooms/<int:bathroom_id>/reviews')