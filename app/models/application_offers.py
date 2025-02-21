from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime


class ApplicationOffer(db.Model):
    __tablename__ = "application_offers"

    if environment == "production":
        __table_args__ = {"schema": SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    application_id = db.Column(
        db.Integer,
        db.ForeignKey(add_prefix_for_prod("applications.id", ondelete="CASCADE")),
        nullable=False,
    )
    offer_date = db.Column(db.Date, nullable=False)
    start_date = db.Column(db.Date)
    salary = db.Column(db.Integer, nullable=False)
    offer_details = db.Column(db.Text)
    offer_accepted = db.Column(db.Boolean)
    created_at = db.Column(db.DateTime, default=datetime.today)
    updated_at = db.Column(db.DateTime, default=datetime.today, onupdate=datetime.today)

    application = db.relationship("Application", back_populates="offers")

    def to_dict(self):
        return {
            "id": self.id,
            "applicationId": self.application_id,
            "offerDate": self.offer_date,
            "startDate": self.start_date,
            "salary": self.salary,
            "offerDetails": self.offer_details,
            "offerAccepted": self.offer_accepted
        }