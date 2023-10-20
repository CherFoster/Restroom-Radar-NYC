from flask_sqlalchemy import SQLAlchemy
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

    def __repr__(self):
        return f'<Bathroom(id={self.id}, name="{self.bathroom_name}", street_num={self.street_num}, street_name="{self.street_name}", city="{self.city}", zip_code={self.zip_code}, image="{self.image}")>'