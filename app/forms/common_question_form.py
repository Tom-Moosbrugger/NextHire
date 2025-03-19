from flask_wtf import FlaskForm
from wtforms import StringField, TextAreaField
from wtforms.validators import InputRequired, Length, DataRequired

class CommonQuestionForm(FlaskForm):
    question = StringField(validators=[InputRequired(), Length(min=10, max=500)])
    response = TextAreaField(validators=[InputRequired()])