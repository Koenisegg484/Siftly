import pymongo

connection_url = 'mongodb+srv://shivamc86:MXZDJ9udztPyTDWk@siftlycluster.8weog.mongodb.net/?retryWrites=true&w=majority&appName=SiftlyCluster'

client = pymongo.MongoClient(connection_url)

db = client['Siftly_Database']


def test_connection():
    try:
        # Try to get collection names
        collections = db.list_collection_names()
        print("Connected to MongoDB. Collections: ", collections)
    except Exception as e:
        print("Failed to connect to MongoDB: ", e)

if __name__ == "__main__":
    test_connection()


# import pymongo
#
# # connection_url = 'mongodb+srv://shivamc86:MXZDJ9udztPyTDWk@siftlycluster.8weog.mongodb.net/?retryWrites=true&w=majority&ssl=true'
#
# connection_url = 'mongodb+srv://shivamc86:MXZDJ9udztPyTDWk@siftlycluster.8weog.mongodb.net/?retryWrites=true&w=majority&appName=SiftlyCluster'
# client = pymongo.MongoClient(connection_url)
# db = client['Siftly_Database']
#
# def test_connection():
#     try:
#         # Try to get collection names
#         collections = db.list_collection_names()
#         print("Connected to MongoDB. Collections: ", collections)
#     except Exception as e:
#         print("Failed to connect to MongoDB: ", e)
#
# if __name__ == "__main__":
#     test_connection()
