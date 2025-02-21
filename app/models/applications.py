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
    company_name = db.Column(db.String(80), nullable=False)
    company_website = db.Column(db.String(2083), nullable=False)
    job_title = db.Column(db.String(80), nullable=False)
    job_details = db.Column(db.Text)
    job_post_url = db.Column(db.String(2083))
    submission_details = db.Column(db.Text)
    application_deadline = db.Column(db.Date, nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.today)
    updated_at = db.Column(db.DateTime, default=datetime.today, onupdate=datetime.today)

    resumes = db.relationship(
        "ApplicationResume", back_populates="applications", cascade="all, delete-orphan"
    )
    cover_letters = db.relationship(
        "ApplicationCoverLetter",
        back_populates="applications",
        cascade="all, delete-orphan",
    )
    questions = db.relationship(
        "ApplicationQuestion",
        back_populates="applications",
        cascade="all, delete-orphan",
    )
    interviews = db.relationship(
        "ApplicationInterview",
        back_populates="applications",
        cascade="all, delete-orphan",
    )
    questions = db.relationship(
        "ApplicationRejection",
        back_populates="applications",
        cascade="all, delete-orphan",
    )
    questions = db.relationship(
        "ApplicationOffer", back_populates="applications", cascade="all, delete-orphan"
    )
