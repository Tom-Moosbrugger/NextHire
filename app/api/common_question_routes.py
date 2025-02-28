from flask import Blueprint, request
from flask_login import login_required, current_user
from app.forms import CommonQuestionForm
from app.models import db, CommonQuestion


common_question_routes = Blueprint("common_questions", __name__)


@common_question_routes.route("/<int:common_question_id>", methods=["PUT"])
@login_required
def update_common_question(common_question_id):
    form = CommonQuestionForm()

    form["csrf_token"].data = request.cookies["csrf_token"]

    edited_common_question = CommonQuestion.query.get(common_question_id)

    if edited_common_question is None:
        return {"errors": "Common question not found"}, 404

    if edited_common_question.user_id != current_user.id:
        return {"errors": "Common question must belong to current user"}
    
    if form.validate_on_submit():
        edited_common_question.question = form.question.data
        edited_common_question.response = form.response.data

        db.session.commit()

        return {edited_common_question.id: edited_common_question.to_dict()}
    
    return form.errors, 400
        


@common_question_routes.route("/<int:common_question_id>", methods=["DELETE"])
@login_required
def delete_common_question(common_question_id):
    common_question_to_delete = CommonQuestion.query.get(common_question_id)

    if common_question_to_delete is None:
        return {"errors": "Common question not found"}, 404

    if common_question_to_delete.user_id != current_user.id:
        return {"errors": "Common question must belong to current user"}

    db.session.delete(common_question_to_delete)

    db.session.commit()

    return {"message": "Successfully deleted"}


@common_question_routes.route("", methods=["POST"])
@login_required
def create_common_question():
    form = CommonQuestionForm()

    form["csrf_token"].data = request.cookies["csrf_token"]

    if form.validate_on_submit():
        new_question = CommonQuestion(
            user_id=current_user.id,
            question=form.question.data,
            response=form.response.data,
        )

        db.session.add(new_question)

        db.session.commit()

        return {new_question.id: new_question.to_dict()}

    return form.errors, 400


@common_question_routes.route("")
@login_required
def get_common_questions():
    common_questions = CommonQuestion.query.filter(
        CommonQuestion.user_id == current_user.id
    ).all()

    return {
        common_question.id: common_question.to_dict()
        for common_question in common_questions
    }
