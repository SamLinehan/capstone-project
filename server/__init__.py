from flask import Flask, make_response, jsonify
from flask.ext.mongoengine import MongoEngine
from mongoengine import connect

app = Flask(__name__, instance_relative_config=True)
app.config.from_pyfile('config.py')
print app.config['MONGOLAB_URI']

# MONGO_URL = app.config.from_envvar('MONGOLAB_URI')
# if not MONGO_URL:
#     MONGO_URL = "mongodb://localhost:27017/capstone"
#
# app.config['MONGO_URL'] = MONGO_URL
# MONGO_URL = "mongodb://localhost:27017/capstone"
db = MongoEngine(app)

connect('capstone')


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
            "favorites": []
        }
    }
]

events = [
    {
        "_id": 1,
        "name": "Fare Thee Well",
        "date": "07/03/2015",
        "num_posts": 3,
        "venue": {
            "name": "Soldier Field",
            "city": "Chicago",
            "state": "IL"
        }
    }
]


@app.route('/posts')
def get_posts():
    return jsonify({'posts': posts})

@app.route('/events')
def get_events():
    return jsonify({'events': events})
    # for event in Event.objects:
    #     print event.name


if __name__ == "__main__":
    app.run(debug=True)
