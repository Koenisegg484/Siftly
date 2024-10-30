import pymongo

connection_url = 'mongodb+srv://shivamc86:MXZDJ9udztPyTDWk@siftlycluster.8weog.mongodb.net/'

client = pymongo.MongoClient(connection_url)


db = client['Siftly_Database']
