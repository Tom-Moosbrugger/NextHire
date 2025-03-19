from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField
from wtforms.validators import Length, DataRequired

class ApplicationQuestionForm(FlaskForm):
    question = StringField(validators=[DataRequired(), Length(min=10, max=500)])
    response = TextAreaField(validators=[DataRequired()])