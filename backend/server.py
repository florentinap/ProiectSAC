from flask import Flask, request, jsonify
from flask_cors import CORS
from database import *

app = Flask(__name__)
CORS(app)

@app.route("/allBooks")
def allBooks():
    result = getBooksList()
    return jsonify(result)


@app.route("/bookById")
def bookById():
	bookId = request.args.get('id')
    result = getBookById(bookId)
    return jsonify(result)

if __name__ == "__main__":
    app.run()
