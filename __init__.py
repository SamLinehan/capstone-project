import os
from flask import Flask, make_response, jsonify, request
from flask.ext.cors import CORS
import pymongo
from pymongo import MongoClient
from bson.json_util import dumps
from os.path import join, dirname
from dotenv import load_dotenv
from flask.ext.socketio import SocketIO, emit
import ast
import datetime


dotenv_path = join(dirname(__file__), '.env')
load_dotenv(dotenv_path)


app = Flask(__name__, instance_path='/Users/Linehan/desktop/workspace/capstone/project/instance')
CORS(app, resources=r'/*', allow_headers='Content-Type')
socketio = SocketIO(app)

MONGO_URL = os.environ.get("MONGOLAB_URI")
DB_NAME = os.environ.get("DB_NAME")
if not MONGO_URL:
    MONGO_URL = "mongodb://localhost:27017/capstone"


client = MongoClient(MONGO_URL)
db = client[DB_NAME]
events_collection = db['events']
rooms_collection = db['rooms']


posts = [
    {
        "_id": 1,
        "title": "West Parking Lot",
        "body": "Absolute rager out here",
        "time": "5:30pm",
        "upvotes": 8,
        "downvotes": 3,
        "event_id": 1,
        "user": {
            "name": "Sam",
        }
    }
]

# event_posts = {
#     "_id" : 1,
#     "event_id" : "reference id"
#     "posts": [{
#             "body": "Absolute rager out here",
#             "time": "5:30pm",
#             "user": {
#                 "name": "Sam",
#             }
#     }]
# }


@app.route('/posts')
def get_posts():
    return jsonify({'posts': posts})

@app.route('/events')
def get_events():
    return dumps(events_collection.find())


@app.route('/create_event', methods=['POST'])
def create_event():
    form_data = ast.literal_eval((request.data).decode())
    venue_city = form_data["venueCity"]
    venue_name = form_data["venueName"]
    venue_state = form_data["venueState"]
    event_name = form_data["eventName"]
    new_event = {
        "date": "11/13/2015",
        "venue": {
            "city": venue_city,
            "state": venue_state,
            "name": venue_name
            },
        "name": event_name,
        "room": {
            "name" : venueName,
            "posts": []
            }
        }
    db.events.insert_one(new_event)

if __name__ == "__main__":
    app.run(debug=True)
