import MySQLdb

def checkUser(username, password):
	mydb = MySQLdb.connect(host = 'localhost', user = 'root', passwd = 'flory95', db = 'sac', use_unicode = True, charset = 'utf8')
	cursor = mydb.cursor()

	query = 'SELECT id FROM users WHERE username=\'' + username + '\' AND password=\'' + password + '\''
	try:
		cursor.execute(query)
	except Exception as e:
		print (e)

	result = cursor.fetchone()
	cursor.close()

	if result == None:
		return {'error': 'Username or password are incorrect'}
	else:
		return {'OK': result[0]}