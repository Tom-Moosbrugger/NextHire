from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime


class ApplicationResume(db.Model):
    __tablename__ = "application_resumes"

    if environment == "production":
        __table_args__ = {"schema": SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    application_id = db.Column(
        db.Integer,
        db.ForeignKey(add_prefix_for_prod("applications.id")),
        nullable=False,
    )
    resume_url = db.Column(db.String(2083), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.today)
    updated_at = db.Column(db.DateTime, default=datetime.today, onupdate=datetime.today)

    application = db.relationship("Application", back_populates="resumes")

    def to_dict(self):
        return {
            "resumeUrl": self.resume_url,
        }
