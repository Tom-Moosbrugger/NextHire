from flask.cli import AppGroup
from .users import seed_users, undo_users
from .applications import seed_applications, undo_applications
from .common_questions import seed_common_questions, undo_common_questions

from app.models.db import db, environment, SCHEMA

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    if environment == 'production':
        # Before seeding in production, you want to run the seed undo 
        # command, which will  truncate all tables prefixed with 
        # the schema name (see comment in users.py undo_users function).
        # Make sure to add all your other model's undo functions below
        undo_users()
        undo_applications()
        undo_common_questions
    seed_users()
    seed_applications()
    seed_common_questions()
    # Add other seed functions here


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_users()
    undo_applications()
    undo_common_questions()
    # Add other undo functions here
