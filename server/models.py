import datetime
from flask import url_for
from server import db

# class Post(db.document):
#     created_at = db.DateTimeField(default=datetime.datetime.now, required=True)
#     title = db.StringField(max_length=255, required=True)
#     body = db.StringField(required=True)
#     upvotes =
#     downvotes =
#     event_name =
#     user = db.embeddeddocument

class Venue(db.EmbeddedDocument):
    name = db.StringField(max_length=255, required=True)
    city = db.StringField(max_length=100, required=True)
    state = db.StringField(max_length=2, required=True)

class Event(db.Document):
    name = db.StringField(max_length=255, required=True)
    date = db.DateTimeField(default=datetime.datetime.now, required=True)
    venue = db.ListField(db.EmbeddedDocumentField('Venue'))
