from flask import Blueprint, request
from flask_login import login_required, current_user
from app.forms import ApplicationForm
from app.models import db, Application
from app.api.aws_helper_functions import (upload_file_to_s3, get_unique_filename)


application_routes = Blueprint('applications', __name__)

@application_routes.route("", methods=["POST"])
@login_required
def create_application():
    form = ApplicationForm()

    form["csrf_token"].data = request.cookies["csrf_token"]

    # print(form.application_status.data)
    # print(form.company_name.data)
    # print(form.company_website.data)
    # print(form.job_title.data)
    # print(form.job_details.data)
    # print(form.job_post_url.data)
    # print(form.submission_details.data)
    # print(form.application_deadline.data)
    print(form.cover_letter.data.filename)
    print(form.resume.data.filename)
    
    if form.validate_on_submit():
        # new_application = Application(
        #     user_id = current_user.id,
        #     application_status = ,

        # )
        # if form.cover_letter.data is not None:
        #     cover_letter = form.cover_letter.data
            
        #     cover_letter.filename = get_unique_filename(cover_letter.filename)
            
        #     cl_upload = upload_file_to_s3(cover_letter)

        #     if "url" not in cl_upload:
        #         return cl_upload


        # check if cover letter/resume exists
        # if yes, get unique filename
        # then, upload file to s3
        # check if "url" is returned; if not, throw errors
        # if url, extract it into a variable
        # go on with normal creation of the application:
            # create instance of the application class
        return { "message": "form is validated" }

    return {"errors": form.errors}, 400