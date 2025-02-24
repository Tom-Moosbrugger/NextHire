from .db import db, environment, SCHEMA, add_prefix_for_prod
from datetime import datetime


class Application(db.Model):
    __tablename__ = "applications"

    if environment == "production":
        __table_args__ = {"schema": SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(
        db.Integer,
        db.ForeignKey(add_prefix_for_prod("users.id"), ondelete="CASCADE"),
        nullable=False,
    )
    application_status = db.Column(db.String(9), nullable=False)
    company_name = db.Column(db.String(80), nullable=False)
    company_website = db.Column(db.String(2083))
    job_title = db.Column(db.String(80), nullable=False)
    job_details = db.Column(db.Text)
    job_post_url = db.Column(db.String(2083))
    submission_details = db.Column(db.Text)
    application_deadline = db.Column(db.Date, nullable=False)
    cover_letter_url = db.Column(db.String(2083))
    resume_url = db.Column(db.String(2083))
    created_at = db.Column(db.DateTime, default=datetime.today)
    updated_at = db.Column(db.DateTime, default=datetime.today, onupdate=datetime.today)

    questions = db.relationship(
        "ApplicationQuestion",
        back_populates="application",
        cascade="all, delete-orphan",
    )
    interviews = db.relationship(
        "ApplicationInterview",
        back_populates="application",
        cascade="all, delete-orphan",
    )
    rejections = db.relationship(
        "ApplicationRejection",
        back_populates="application",
        cascade="all, delete-orphan",
    )
    offers = db.relationship(
        "ApplicationOffer", back_populates="application", cascade="all, delete-orphan"
    )
