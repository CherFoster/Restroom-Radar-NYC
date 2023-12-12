from sqlalchemy_serializer import SerializerMixin
from config import db
from sqlalchemy import ForeignKey, Table, Column, Integer, String, ForeignKeyConstraint


user_bathrooms = db.Table(
    'user_bathrooms',
    db.Column('user_id', db.Integer, ForeignKey('users.id')),
    db.Column('bathroom_id', db.Integer, ForeignKey('bathrooms.id')),
    db.PrimaryKeyConstraint('user_id', 'bathroom_id')
)
