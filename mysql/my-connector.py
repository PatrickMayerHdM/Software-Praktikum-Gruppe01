import mysql.connector

mydb = mysql.connector.connect(
    host='localhost',
    user='root',
    password='Michi2110,',
    port='3306',
    database='sopra'
)

mycursor = mydb.cursor()

mycursor.execute('SELECT * FROM profile')

profiles = mycursor.fetchall()

for profile in profiles:
    print(profile[0])
    print("favoritenote_id: " + profile[1])
    print("blocknote_id: " + profile[2])