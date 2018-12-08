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

	query = 'SELECT id, title, author FROM books'
	try:
		cursor.execute(query)
	except Exception as e:
		print (e)

	header = [x[0] for x in cursor.description]
	data = cursor.fetchall()[1:]
	cursor.close()

	result = []
	for d in data:
		title = d[1][1:-1]
		author = d[2][1:-1]
		result.append(dict(zip(header, (d[0], title, author))))

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
	print (data)
	result = dict(zip(header, data))

	return result


# insertIntoMysql()
# getBooksList()
# getBookById(3)