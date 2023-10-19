import mysql.connector
	
mydb = mysql.connector.connect(
host="localhost",
user="root",
database="testdb",
password="",
)
mycursor = mydb.cursor()
mycursor.execute("SELECT VERSION();")
result  = mysql.fetchall()
for x in result:print(x)
