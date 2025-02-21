from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime


class ApplicationCoverLetter(db.Model):
    __tablename__ = "application_cover_letters"

    if environment == "production":
        __table_args__ = {"schema": SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    application_id = db.Column(
        db.Integer,
        db.ForeignKey(add_prefix_for_prod("applications.id", ondelete="CASCADE")),
        nullable=False,
    )
    cover_letter_url = db.Column(db.String(2083), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.today)
    updated_at = db.Column(db.DateTime, default=datetime.today, onupdate=datetime.today)

    application = db.relationship("Application", back_populates="cover_letters")

    def to_dict(self):
        return {
            "id": self.id,
            "applicationId": self.application_id,
            "resumeUrl": self.cover_letter_url,
        }