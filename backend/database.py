#/* Copyright (C) Florentina Petcu - All Rights Reserved
# * Unauthorized copying of this file, via any medium is strictly prohibited
# * Proprietary and confidential
# * Written by Florentina Petcu <florentina.ptc@gmail.com>, December 2018
# */

import csv
import MySQLdb
import re

def insertIntoMysql():
	mydb = MySQLdb.connect(host = 'localhost', user = 'root', passwd = 'flory95', db = 'sac', use_unicode = True, charset = 'utf8')
	cursor = mydb.cursor()
	with open('resources/database/books.csv') as f:
		reader = csv.reader(f)
		for row in  reader:
			try:
				cursor.execute('INSERT INTO books(url, title, author, price, pages, description, publisher, language, customer_reviews, stars) VALUES("%s", "%s", "%s", "%s", "%s", "%s", "%s", "%s", "%s", "%s")', 
					[row[0], row[1], row[2], row[3], row[5], row[6], row[8].encode('utf-8'), row[9], row[13], row[14]])
			except Exception as e:
				print (e)
				print (row)
				break
	mydb.commit()
	cursor.close()

def getBooksList():
	mydb = MySQLdb.connect(host = 'localhost', user = 'root', passwd = 'flory95', db = 'sac', use_unicode = True, charset = 'utf8')
	cursor = mydb.cursor()

	query = 'SELECT id, title, author, stars FROM books'
	try:
		cursor.execute(query)
	except Exception as e:
		print (e)

	header = [x[0] for x in cursor.description]
	header[3] = 'rating'
	data = cursor.fetchall()[1:]
	cursor.close()

	result = []
	for d in data:
		title = d[1][1:-1]
		author = d[2][1:-1]
		stars = d[3][1:-1]
		result.append(dict(zip(header, (d[0], title, author, stars))))

	return result

def getBookById(idBook):
	mydb = MySQLdb.connect(host = 'localhost', user = 'root', passwd = 'flory95', db = 'sac', use_unicode = True, charset = 'utf8')
	cursor = mydb.cursor()

	query = 'SELECT * FROM books where id = ' + str(idBook)
	try:
		cursor.execute(query)
	except Exception as e:
		print (e)

	header = [x[0] for x in cursor.description]
	data = cursor.fetchone()
	cursor.close()

	data = [d[1:-1] if not isinstance(d, int) else d for d in data]
	result = dict(zip(header, data))

	return result

def getDescriptions():
	mydb = MySQLdb.connect(host = 'localhost', user = 'root', passwd = 'flory95', db = 'sac', use_unicode = True, charset = 'utf8')
	cursor = mydb.cursor()

	query = 'SELECT id, description FROM books'
	try:
		cursor.execute(query)
	except Exception as e:
		print (e)

	data = cursor.fetchall()[1:]
	cursor.close()

	result = list((d[0], d[1][1:-1]) for d in data)

	return result

def getBooksListById(ids):
	mydb = MySQLdb.connect(host = 'localhost', user = 'root', passwd = 'flory95', db = 'sac', use_unicode = True, charset = 'utf8')
	cursor = mydb.cursor()

	data = []
	for idBook in ids:
		query = 'SELECT id, title, author, stars FROM books where id = ' + str(idBook)
		try:
			cursor.execute(query)
		except Exception as e:
			print (e)

		header = [x[0] for x in cursor.description]
		header[3] = 'rating'
		data += [cursor.fetchone()]
	
	cursor.close()

	result = []
	for d in data:
		title = d[1][1:-1]
		author = d[2][1:-1]
		stars = d[3][1:-1]
		result.append(dict(zip(header, (d[0], title, author, stars))))

	return result

def getFavorites(idUser):
	mydb = MySQLdb.connect(host = 'localhost', user = 'root', passwd = 'flory95', db = 'sac', use_unicode = True, charset = 'utf8')
	cursor = mydb.cursor()

	query = 'SELECT idBook FROM favorites where idUser = ' + str(idUser)
	try:
		cursor.execute(query)
	except Exception as e:
		print (e)

	idsbook = cursor.fetchall()
	cursor.close()

	result = []
	for idbook in idsbook:
		result.append(getBookById(idbook[0]))
	return result

def addFavorite(idUser, idBook):
	mydb = MySQLdb.connect(host = 'localhost', user = 'root', passwd = 'flory95', db = 'sac', use_unicode = True, charset = 'utf8')
	cursor = mydb.cursor()

	try:
		cursor.execute('INSERT into favorites (idUser, idBook) VALUES("%s", "%s")', [idUser, idBook])
	except Exception as e:
		print (e)
		return {'error': 'cannot set favorite book'}

	mydb.commit()
	cursor.close()

	return {'OK': 'ok'}

def insertRecomandation(idUser, books):
	mydb = MySQLdb.connect(host = 'localhost', user = 'root', passwd = 'flory95', db = 'sac', use_unicode = True, charset = 'utf8')
	cursor = mydb.cursor()

	for book in books:
		try:
			cursor.execute('INSERT into recomandation (idUser, idBook) VALUES("%s", "%s")', [idUser, book['id']])
		except Exception as e:
			print (e)
	
	mydb.commit()
	cursor.close()

def getRecomandation(idUser):
	mydb = MySQLdb.connect(host = 'localhost', user = 'root', passwd = 'flory95', db = 'sac', use_unicode = True, charset = 'utf8')
	cursor = mydb.cursor()

	query = 'SELECT idBook FROM recomandation where idUser = ' + str(idUser)
	try:
		cursor.execute(query)
	except Exception as e:
		print (e)

	idsbook = list(set(cursor.fetchall()))
	cursor.close()

	result = []
	for idbook in idsbook:
		result.append(getBookById(idbook[0]))
	return result
