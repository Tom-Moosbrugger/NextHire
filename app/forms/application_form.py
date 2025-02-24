from flask_wtf import FlaskForm
from flask_wtf.file import FileField, FileAllowed
from wtforms import StringField, DateField, SelectField, TextAreaField
from wtforms.validators import InputRequired, Length, URL, Optional
from app.api.aws_helper_functions import ALLOWED_EXTENSIONS

class ApplicationForm(FlaskForm):
    application_status = SelectField("application_status", choices=["Upcoming", "Submitted", "Interviewing", "Rejected", "Offered"], validators=[InputRequired()])
    company_name = StringField("company_name", validators=[InputRequired(), Length(min=1, max=80)])
    company_website = StringField("company_website", validators=[Optional(), URL(), Length(min=1, max=2083)])
    job_title = StringField("job_title", validators=[InputRequired(), Length(min=1, max=80)])
    job_details = TextAreaField("job_details")
    job_post_url = StringField("job_post_url", validators=[Optional(), URL(), Length(min=1, max=2083)])
    submission_details = TextAreaField("submission_details")
    application_deadline = DateField("application_deadline", validators=[InputRequired()])
    cover_letter = FileField("cover_letter", validators=[Optional(), FileAllowed(list(ALLOWED_EXTENSIONS))])
    resume = FileField("resume", validators=[Optional(), FileAllowed(list(ALLOWED_EXTENSIONS))])

