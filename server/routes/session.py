from flask import request, make_response, abort, session
from sqlalchemy.exc import IntegrityError
from flask_restful import Resource
from models.models import User
from config import api, db

class Login(Resource):
    def post(self): 
            request_json = request.get_json()
            username = request_json.get('username')
            password = request_json.get('password')
            user = User.query.filter_by(username=username).first()
            if user and user.authenticate(password):
                session['user_id'] = user.id
            
                return user.to_dict(), 200
            else:
                abort(422, "Incorrect username or password")
        
api.add_resource(Login, '/api/login')

class Signup(Resource):
    def post(self):
        request_json = request.get_json()
        username = request_json.get("username")
        password = request_json.get("password")
        try:
            user = User(username=username)
            
            user.password = password
            
            db.session.add(user)
            db.session.commit()

            session["user_id"] = user.id
            
            return user.to_dict(), 201
    
        except IntegrityError:
            return{"error": "Username must be unique"}, 422
        except ValueError as err:
            return{"error": str(err)}, 422

api.add_resource(Signup, '/api/signup')

class AuthorizedSession(Resource):
    def get(self):
        try:
            user = User.query.filter_by(id=session['user_id']).first()
            return user.to_dict(), 200
        except:
            abort(401, "Unauthorized")

api.add_resource(AuthorizedSession, '/api/authorized')

class Logout(Resource):
    def delete(self):
        del session['user_id']
    
        return {"message": "You have logged out"}, 200
    
api.add_resource(Logout, '/api/logout')

# to store user
class CheckSession(Resource):
    def get(self):
        try:
            user = User.query.filter_by(id=session['user_id']).first()
           
            return user.to_dict(), 200
        except:
            return {"error": "Please log in"}, 401

api.add_resource(CheckSession, '/api/check_session')