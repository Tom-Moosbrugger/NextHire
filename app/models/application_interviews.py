from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime


class ApplicationInterview(db.Model):
    __tablename__ = "application_interviews"

    if environment == "production":
        __table_args__ = {"schema": SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    application_id = db.Column(
        db.Integer,
        db.ForeignKey(add_prefix_for_prod("applications.id", ondelete="CASCADE")),
        nullable=False,
    )
    interview_date = db.Column(db.Date, nullable=False)
    interview_time = db.Column(db.String(7), nullable=False)
    interview_round = db.Column(db.String(20), nullable=False)
    interview_location = db.Column(db.String(9), nullable=False)
    interview_notes = db.Column(db.Text)
    created_at = db.Column(db.DateTime, default=datetime.today)
    updated_at = db.Column(db.DateTime, default=datetime.today, onupdate=datetime.today)

    application = db.relationship("Application", back_populates="interviews")

    def to_dict(self):
        return {
            "id": self.id,
            "applicationId": self.application_id,
            "interviewDate": self.interview_date,
            "interviewTime": self.interview_time,
            "interviewRound": self.interview_round,
            "interviewLocation": self.interview_location,
            "interviewNotes": self.interview_notes,
        }
