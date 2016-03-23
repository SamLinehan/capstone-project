import os
from flask import Flask, make_response, jsonify, request
from flask.ext.cors import CORS
import pymongo
from pymongo import MongoClient
from bson.json_util import dumps
from bson.objectid import ObjectId
from os.path import join, dirname
from dotenv import load_dotenv
from flask.ext.socketio import SocketIO, emit, send
import ast
import datetime


dotenv_path = join(dirname(__file__), '.env')
load_dotenv(dotenv_path)


app = Flask(__name__, instance_path='/Users/Linehan/desktop/workspace/capstone/project/instance')
CORS(app, resources={r'/*' : {"origins": "*"}}, allow_headers='Content-Type')
socketio = SocketIO(app)

MONGO_URL = os.environ.get("MONGOLAB_URI")
DB_NAME = os.environ.get("DB_NAME")
if not MONGO_URL:
    MONGO_URL = "mongodb://localhost:27017/capstone"


client = MongoClient(MONGO_URL)
db = client[DB_NAME]
events_collection = db['events']


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
    db.events.insert_one(
        {
        "date": "11/13/2015",
        "venue": {
            "city": venue_city,
            "state": venue_state,
            "name": venue_name
            },
        "name": event_name,
        "posts": []
        }
    )




@app.route('/create_post', methods=["POST"])
def create_post():
    form_data = ast.literal_eval((request.data).decode())
    print(form_data)
    venue_id = form_data["id"]
    post_body = form_data["body"]
    post_name = form_data["name"]
    post_date = datetime.datetime.utcnow()

    if "image" in form_data:
        post_image = form_data["image"]
        db.events.update(
            { "_id": ObjectId(venue_id)},
            { "$push":
                { "posts": {
                    "body": post_body,
                    "image": post_image,
                    "time": post_date,
                    "name": post_name
                    }
                }
        })
    else:
        db.events.update(
            { "_id": ObjectId(venue_id)},
            { "$push":
                { "posts": {
                    "body": post_body,
                    "time": post_date,
                    "name": post_name
                    }
                }
        })

    socketio.emit('newPostEvent', {'newPost': {
                "event_id": ObjectId(venue_id),
                 "post": {
                        "body": post_body,
                        "time": post_date,
                        "user_name": post_name
                        }
                    } }, namespace='/test')

    print("OKAY")
    return "OK"

# ******
@socketio.on('test_event', namespace="/test")
def test_message(message):
    emit('testing', {'data': message['data']})

#
# @socketio.on('connect', namespace="/test")
# def test_connect():
#     print("Connected!!!")
#     emit('test_event', {'data': 'Connected'})


if __name__ == "__main__":
    app.run(debug=True)
    socketio.run(app)
