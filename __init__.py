from flask import Flask, make_response
from flask.ext.mongoengine import MongoEngine

app = Flask(__name__, instance_relative_config=True)
# app.config.from_pyfile('config.py')

db = MongoEngine(app)

@app.route('/')
def index():
    return make_response(open('templates/index.html').read())

if __name__ == '__main__':
    app.run()
