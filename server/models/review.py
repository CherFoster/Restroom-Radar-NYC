from sqlalchemy_serializer import SerializerMixin
from config import db

class Review(db.Model, SerializerMixin):
    __tablename__ = 'reviews'

    id = db.Column(db.Integer, primary_key=True)
    content = db.Column(db.String)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    bathroom_id = db.Column(db.Integer, db.ForeignKey('bathrooms.id'))
    created_at = db.Column(db.DateTime, server_default=db.func.now())

    serialize_rules = ('-user.reviews', '-bathroom.reviews')

    #add repr?