from sqlalchemy_serializer import SerializerMixin
from sqlalchemy.orm import validates
from sqlalchemy.ext.hybrid import hybrid_property
from .user_bathroom import *
from config import db, bcrypt

class User(db.Model, SerializerMixin):
    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String, unique=True)
    admin = db.Column(db.Boolean, default=False)
    _password_hash = db.Column(db.String)

    reviews = db.relationship('Review', backref='user')
    bathrooms = db.relationship('Bathroom', secondary=user_bathrooms, back_populates='users')

    serialize_rules = ('-reviews.user', '-bathrooms.users')

    @validates('username')
    def validate_username(self, key, username):
        if not username:
            raise ValueError('Username is required.')
        elif len(username) < 8:
            raise ValueError('Username must be at least 8 characters in length.')
       
        existing_user = User.query.filter_by(username=username).first()
        if existing_user:
            raise ValueError('Username is already taken.')
        return username

    @hybrid_property
    def password(self):
        return self._password_hash
    
    @password.setter
    def password(self, raw_password):
        password_hash = bcrypt.generate_password_hash(raw_password.encode('utf-8'))
        self._password_hash = password_hash.decode('utf-8')

    def authenticate(self, raw_password):
        return bcrypt.check_password_hash(self._password_hash, raw_password)

    def __repr__(self):
        return f'<USER: ID: {self.id}, Username: {self.username}, Admin: {self.admin}>'
