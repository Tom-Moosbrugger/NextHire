from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime


class CommonQuestion(db.Model):
    __tablename__ = "common_questions"

    if environment == "production":
        __table_args__ = {"schema": SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(
        db.Integer,
        db.ForeignKey(add_prefix_for_prod("users.id"), ondelete="CASCADE"),
        nullable=False,
    )
    question = db.Column(db.String(500), nullable=False)
    response = db.Column(db.Text, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.today)
    updated_at = db.Column(db.DateTime, default=datetime.today, onupdate=datetime.today)

    def to_dict(self):
        return {
            "id": self.id,
            "userId": self.user_id,
            "question": self.question,
            "response": self.response,
        }
