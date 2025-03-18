from flask import Blueprint, request
from flask_login import login_required, current_user
from app.forms import CommonQuestionForm
from app.models import db, ApplicationQuestion

application_question_routes = Blueprint("application_questions", __name__)

@application_question_routes.route("/<int:application_id>")
@login_required
def get_application_questions(application_id):
    return { "testing": "test" }

@application_question_routes.route("/<int:application_id>", methods=["POST"])
@login_required
def create_application_questions(application_id):
    print(request.get_json())
    return { "testing": "test" }





"""
I need to do full CRUD RESTful routes:
get all application questions for a specific application
return them in some form for redux

create an application question

delete an application question

update an application question

"""