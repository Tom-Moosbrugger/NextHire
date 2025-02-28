from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime


class ApplicationRejection(db.Model):
    __tablename__ = "application_rejections"

    if environment == "production":
        __table_args__ = {"schema": SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    application_id = db.Column(
        db.Integer,
        db.ForeignKey(add_prefix_for_prod("applications.id"), ondelete="CASCADE"),
        nullable=False,
    )
    rejection_date = db.Column(db.Date, nullable=False)
    feedback_requested = db.Column(db.Boolean, nullable=False)
    feedback_provided = db.Column(db.Boolean)
    feedback_details = db.Column(db.Text)
    created_at = db.Column(db.DateTime, default=datetime.today)
    updated_at = db.Column(db.DateTime, default=datetime.today, onupdate=datetime.today)

    application = db.relationship("Application", back_populates="rejections")

    def to_dict(self):
        return {
            "id": self.id,
            "applicationId": self.application_id,
            "rejectionDate": self.rejection_date,
            "feedbackRequested": self.feedback_requested,
            "feedbackProvided": self.feedback_provided,
            "feedbackDetails": self.feedback_details
        }