from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime


class ApplicationQuestion(db.Model):
    __tablename__ = "application_questions"

    if environment == "production":
        __table_args__ = {"schema": SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    application_id = db.Column(
        db.Integer,
        db.ForeignKey(add_prefix_for_prod("applications.id"), ondelete="CASCADE"),
        nullable=False,
    )
    question = db.Column(db.String(300), nullable=False)
    response = db.Column(db.Text, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.today)
    updated_at = db.Column(db.DateTime, default=datetime.today, onupdate=datetime.today)

    application = db.relationship("Application", back_populates="questions")

    def to_dict(self):
        return {
            "id": self.id,
            "applicationId": self.application_id,
            "question": self.question,
            "response": self.response,
        }
