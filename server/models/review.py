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

    def __repr__(self):
        return f'<Review(id={self.id}, content="{self.content}", user_id={self.user_id}, bathroom_id={self.bathroom_id}, created_at={self.created_at})>'