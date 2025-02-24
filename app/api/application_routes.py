from flask import Blueprint
from flask_login import login_required, current_user
from app.forms import ApplicationForm
from app.models import db, Application

