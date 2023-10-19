from flask import request, make_response, abort, session
from flask_restful import Resource
from models.models import Bathroom
from config import api, db

class Bathrooms(Resource):
    def get(self):
        bathroom = [bathroom.to_dict() for bathroom in Bathroom.query.all()]
        return make_response(bathroom, 200)

    def post(self):
        request_json = request.get_json()

        bathroom_name = request_json.get('bathroom_name')
        street_num = request_json.get('street_num')
        street_name = request_json.get('street_name')
        city = request_json.get('city')
        zip_code = request_json.get('zip_code')

        bathroom = Bathroom(
            bathroom_name=bathroom_name,
            street_num=street_num,
            street_name=street_name,
            city=city,
            zip_code=zip_code
        )

        db.session.add(bathroom)
        db.session.commit()

        return bathroom.to_dict(), 200
    
api.add_resource(Bathrooms, '/api/bathrooms')

class BathroomResource(Resource):
    def get(self, id):
        bathrooms = Bathroom.query.filter_by(id=id).first()
        return bathrooms.to_dict(), 200
    
    def delete(self, id):
        bathrooms = Bathroom.query.get(id)
        if not bathrooms:
            return make_response({'message': 'Bathroom not found'}, 404)

        db.session.delete(bathrooms)
        db.session.commit()

        return make_response({'message': 'Bathroom deleted successfully'}, 204 )
    
    def patch(self, id):
        bathrooms= Bathroom.query.filter_by(id=id).first()
        if not bathrooms:
            return make_response({'message': 'Bathroom not found'}, 404)
        request_json = request.get_json()
        for key in request_json:
            setattr(bathrooms,key,request_json[key])
        
        db.session.add(bathrooms)
        db.session.commit()

        return bathrooms.to_dict(), 200
    
api.add_resource(BathroomResource, '/api/bathrooms/<int:id>')