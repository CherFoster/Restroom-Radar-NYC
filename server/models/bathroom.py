from sqlalchemy_serializer import SerializerMixin
from config import db


class Bathroom(db.Model, SerializerMixin):
    __tablename__ = 'bathrooms'

    id = db.Column(db.Integer, primary_key=True)
    bathroom_name = db.Column(db.String)
    street_num = db.Column(db.Integer)
    street_name = db.Column(db.String)
    city = db.Column(db.String)
    zip_code = db.Column(db.Integer)
    image = db.Column(db.String)

    # reviews = db.relationship('Review', backref='bathroom')
    # users = db.relationship('User', secondary=user_bathrooms, back_populates='bathrooms')

    serialize_rules = ('-reviews.bathroom', '-users.bathrooms')