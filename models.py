import datetime
from flask import url_for
from project import db

class Post(db.document):
    created_at = db.DateTimeField(default=datetime.datetime.now, required=True)
    title = db.StringField(max_length=255, required=True)
    body = db.StringField(required=True)
    comments
