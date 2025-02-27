from flask import Blueprint, request
from flask_login import login_required, current_user
from app.forms import CommonQuestionForm
from app.models import db, CommonQuestion


common_question_routes = Blueprint("common_questions", __name__)

@common_question_routes.route("")
@login_required
def get_common_questions():
    pass