from flask import Blueprint, request
from sqlalchemy.orm import joinedload
from flask_login import login_required, current_user
from app.forms import ApplicationQuestionForm
from app.models import db, ApplicationQuestion, Application

application_question_routes = Blueprint("application_questions", __name__)


@application_question_routes.route("")
@login_required
def get_application_questions(application_id):
    application = Application.query.options(joinedload(Application.questions)).get(
        application_id
    )

    if application is None:
        return {"errors": "Application not found"}, 404

    if application.user_id != current_user.id:
        return {"message": "Application must belong to the current user"}, 403

    return {question.id: question.to_dict() for question in application.questions}


@application_question_routes.route("", methods=["POST"])
@login_required
def create_application_questions(application_id):
    application = Application.query.get(application_id)

    if application is None:
        return {"errors": "Application not found"}, 404

    if application.user_id != current_user.id:
        return {"message": "Application must belong to the current user"}, 403

    new_questions = request.get_json()

    if isinstance(new_questions, list) is not True:
        return {"error": "request must be an array"}, 400

    errors = []

    valid_questions = []

    # iterate through each question in the list and validate inputs
    for index, question_data in enumerate(new_questions):
        form = ApplicationQuestionForm()

        form.process(data=question_data)

        form["csrf_token"].data = request.cookies["csrf_token"]

        if form.validate():
            valid_questions.append(
                ApplicationQuestion(
                    application_id=application_id,
                    question=form.question.data,
                    response=form.response.data,
                )
            )
        else:
            # extract the field name and nested array
            for field_name, error_messages in form.errors.items():
                # extract message from the nested array
                for error_message in error_messages:
                    # normalize error message
                    errors.append(
                        {"index": index, "field": field_name, "message": error_message}
                    )

    if errors:
        return {"errors": errors}

    db.session.add_all(valid_questions)
    db.session.commit()

    return {question.id: question.to_dict() for question in valid_questions}


"""

delete an application question

update an application question

"""
