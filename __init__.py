from flask import Flask, make_response, jsonify
from flask.ext.mongoengine import MongoEngine

app = Flask(__name__, instance_relative_config=True)
# app.config.from_pyfile('config.py')

db = MongoEngine(app)

posts = [
    {
        'id': 1,
        'title': "West Parking Lot",
        'body': "Absolute rager out here",
        'username': "Butch Cassidy",
        'date': "07/03/2015",
        'upvotes': 5,
        'downvotes': 2
    },
    {
        'id': 2,
        'title': "East Parking Lot",
        'body': "Look out for security",
        'username': "Stella Blue",
        'date': "07/03/2015",
        'upvotes': 8,
        'downvotes': 5
    }
]

@app.route('/')
def index():
    return jsonify({'posts': posts})


if __name__ == '__main__':
    app.run()
