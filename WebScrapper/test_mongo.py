from pymongo import MongoClient

def test_mongo_connection(uri):
    try:
        # Create a MongoClient object with the provided URI
        client = MongoClient(uri)

        # Try to connect to the server
        client.admin.command('ping')
        print("Connection to MongoDB successful!")
    except Exception as e:
        print(f"Failed to connect to MongoDB: {e}")
    finally:
        client.close()

if __name__ == '__main__':
    # Replace 'your-mongo-connection-string' with your actual MongoDB connection string
    mongo_uri = 'mongodb+srv://shivamc86:MXZDJ9udztPyTDWk@siftlycluster.8weog.mongodb.net/'
    test_mongo_connection(mongo_uri)
