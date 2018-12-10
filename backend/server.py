#/* Copyright (C) Florentina Petcu - All Rights Reserved
# * Unauthorized copying of this file, via any medium is strictly prohibited
# * Proprietary and confidential
# * Written by Florentina Petcu <florentina.ptc@gmail.com>, December 2018
# */

from flask import Flask, request, jsonify
from flask_cors import CORS
from database import *
from similarity import *

app = Flask(__name__)
CORS(app)

@app.route("/allBooks")
def allBooks():
    result = getBooksList()
    return jsonify(result)


@app.route("/bookById", methods = ['POST', 'GET'])
def bookById():
	bookId = request.json['idBook']
	result = getBookById(bookId)
	return jsonify(result)

@app.route("/similarBooks", methods = ['POST', 'GET'])
def similarBooks():
	bookId = request.json['idBook']
	result = getSimilarBooksList(bookId)
	return jsonify(result)

if __name__ == "__main__":
    app.run()
