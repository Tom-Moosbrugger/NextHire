from flask import Blueprint, request
from flask_login import login_required, current_user
from app.forms import ApplicationForm, ApplicationStatusForm
from app.models import db, Application
from app.api.aws_helper_functions import (
    upload_file_to_s3,
    get_unique_filename,
    remove_file_from_s3,
)


application_routes = Blueprint("applications", __name__)

@application_routes.route("/<int:application_id>", methods=["PATCH"])
@login_required
def update_application_status(application_id):
    form = ApplicationStatusForm()

    print(form.application_status.data)

    form["csrf_token"].data = request.cookies["csrf_token"]

    edited_application = Application.query.get(application_id)

    if edited_application is None:
        return {"errors": "Application not found"}, 404

    if edited_application.user_id != current_user.id:
        return {"message": "Application must belong to the current user"}
    
    if form.validate_on_submit():

        edited_application.application_status = form.application_status.data

        db.session.commit()

        return {edited_application.id: edited_application.to_dict()}

    return form.errors, 400


@application_routes.route("/<int:application_id>", methods=["PUT"])
@login_required
def update_application(application_id):
    form = ApplicationForm()

    form["csrf_token"].data = request.cookies["csrf_token"]

    edited_application = Application.query.get(application_id)

    if edited_application is None:
        return {"errors": "Application not found"}, 404

    if edited_application.user_id != current_user.id:
        return {"message": "Application must belong to the current user"}

    if form.validate_on_submit():
        # updating fields

        edited_application.application_status = form.application_status.data
        edited_application.company_name = form.company_name.data
        edited_application.job_title = form.job_title.data
        edited_application.application_deadline = form.application_deadline.data
        edited_application.company_website = form.company_website.data or None
        edited_application.job_details = form.job_details.data or None
        edited_application.job_post_url = form.job_post_url.data or None
        edited_application.submission_details = form.submission_details.data or None
        edited_application.date_submitted = form.date_submitted.data

        # handling AWS changes

        if form.cover_letter.data is not None:
            # delete old cover letter

            aws_delete = remove_file_from_s3(edited_application.cover_letter_url)

            if aws_delete is not True:
                return aws_delete

            # add new cover letter
            cover_letter = form.cover_letter.data

            cover_letter.filename = get_unique_filename(cover_letter.filename)

            upload = upload_file_to_s3(cover_letter)

            if "url" not in upload:
                return upload

            edited_application.cover_letter_url = upload["url"]

        if form.resume.data is not None:
            # delete old resume

            aws_delete = remove_file_from_s3(edited_application.resume_url)

            if aws_delete is not True:
                return aws_delete

            # add new resume
            resume = form.resume.data

            resume.filename = get_unique_filename(resume.filename)

            upload = upload_file_to_s3(resume)

            if "url" not in upload:
                return upload

            edited_application.resume_url = upload["url"]

        db.session.commit()

        return {edited_application.id: edited_application.to_dict()}

    return form.errors, 400


@application_routes.route("/<int:application_id>", methods=["DELETE"])
@login_required
def delete_application(application_id):
    application_to_delete = Application.query.get(application_id)

    if application_to_delete is None:
        return {"errors": "Application not found"}, 404

    if application_to_delete.user_id != current_user.id:
        return {"errors": "Application must belong to current user"}

    if application_to_delete.cover_letter_url is not None:
        aws_delete = remove_file_from_s3(application_to_delete.cover_letter_url)

        if aws_delete is not True:
            return aws_delete

    if application_to_delete.resume_url is not None:
        aws_delete = remove_file_from_s3(application_to_delete.resume_url)

        if aws_delete is not True:
            return aws_delete

    db.session.delete(application_to_delete)
    db.session.commit()

    return {"message": "Successfully deleted"}


@application_routes.route("", methods=["POST"])
@login_required
def create_application():
    form = ApplicationForm()

    form["csrf_token"].data = request.cookies["csrf_token"]

    if form.validate_on_submit():
        new_application = Application(
            # required fields
            user_id=current_user.id,
            application_status=form.application_status.data,
            company_name=form.company_name.data,
            job_title=form.job_title.data,
            application_deadline=form.application_deadline.data,
            # optional fields
            company_website=form.company_website.data or None,
            job_details=form.job_details.data or None,
            job_post_url=form.job_post_url.data or None,
            submission_details=form.submission_details.data or None,
            cover_letter_url=None,
            resume_url=None,
            date_submitted=form.date_submitted.data,
        )

        if form.cover_letter.data is not None:
            cover_letter = form.cover_letter.data

            cover_letter.filename = get_unique_filename(cover_letter.filename)

            upload = upload_file_to_s3(cover_letter)

            if "url" not in upload:
                return upload

            new_application.cover_letter_url = upload["url"]

        if form.resume.data is not None:
            resume = form.resume.data

            resume.filename = get_unique_filename(resume.filename)

            upload = upload_file_to_s3(resume)

            if "url" not in upload:
                return upload

            new_application.resume_url = upload["url"]

        db.session.add(new_application)

        db.session.commit()

        return {new_application.id: new_application.to_dict()}

    return form.errors, 400


@application_routes.route("")
@login_required
def get_applications():
    applications = Application.query.filter(
        Application.user_id == current_user.id
    ).all()

    return {application.id: application.to_dict() for application in applications}
