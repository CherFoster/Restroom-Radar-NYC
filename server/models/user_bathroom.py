from sqlalchemy_serializer import SerializerMixin
from config import db
from sqlalchemy import ForeignKey, Table, Column, Integer

# Define the user_bathrooms table separately
user_bathrooms = db.Table(
    'user_bathrooms',
    db.Column('user_id', db.Integer, db.ForeignKey('users.id')),
    db.Column('bathroom_id', db.Integer, db.ForeignKey('bathrooms.id')),
    db.PrimaryKeyConstraint('user_id', 'bathroom_id')
)

class User_Bathroom(db.Model, SerializerMixin):
    __tablename__ = 'user_bathrooms'
    
    # Add any additional fields/columns specific to this model if needed
    id = db.Column(db.Integer, primary_key=True)

    # Define relationships
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'))
    bathroom_id = db.Column(db.Integer, db.ForeignKey('bathrooms.id'))

    # Relationships with other models
    user = db.relationship('User', backref=db.backref('user_bathrooms'))
    bathroom = db.relationship('Bathroom', backref=db.backref('user_bathrooms'))

    serialize_rules = ('-user.user_bathrooms', '-bathroom.user_bathrooms')





    '''
    from sqlalchemy_serializer import SerializerMixin
from config import db
from sqlalchemy import ForeignKey, Table, Column, Integer, String, ForeignKeyConstraint


user_bathrooms = db.Table(
    'user_bathrooms',
    db.Column('user_id', db.Integer, db.ForeignKey('users.id')),
    db.Column('bathroom_id', db.Integer, db.ForeignKey('bathrooms.id')),
    db.PrimaryKeyConstraint('user_id', 'bathroom_id')
)'''