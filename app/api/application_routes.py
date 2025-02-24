from flask import Blueprint, request
from flask_login import login_required, current_user
from app.forms import ApplicationForm
from app.models import db, Application
from app.api.aws_helper_functions import upload_file_to_s3, get_unique_filename


application_routes = Blueprint("applications", __name__)


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
            company_website=form.company_website.data
            if form.company_website.data is not None
            else None,
            job_details=form.job_details.data
            if form.job_details.data is not None
            else None,
            job_post_url=form.job_post_url.data
            if form.job_post_url.data is not None
            else None,
            submission_details=form.submission_details.data
            if form.submission_details.data is not None
            else None,
            cover_letter_url=None,
            resume_url=None,
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

    return {"message": "testing"}
    # return {"errors": form.errors}, 400
