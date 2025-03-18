from flask import Blueprint, request
from flask_login import login_required, current_user
from app.forms import CommonQuestionForm
from app.models import db, ApplicationQuestion

application_question_routes = Blueprint("application_questions", __name__)

@application_question_routes.route("/<int:application_id>")
@login_required
def get_application_questions(application_id):
    return { "testing": "test" }

