from flask_wtf import FlaskForm
from wtforms import SelectField
from wtforms.validators import InputRequired

class ApplicationStatusForm(FlaskForm):
    application_status = SelectField("application_status", choices=["Upcoming", "Submitted", "Interviewing", "Rejected", "Offered"], validators=[InputRequired()])
