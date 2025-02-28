from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField
from wtforms.validators import InputRequired, Length

class CommonQuestionForm(FlaskForm):
    question = StringField("question", validators=[InputRequired(), Length(min=10, max=500)])
    response = TextAreaField("job_details", validators=[InputRequired()])