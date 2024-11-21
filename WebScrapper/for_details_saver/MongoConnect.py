import pymongo as mongo

def get_db():

    myclient = mongo.MongoClient("mongodb://localhost:27017")
    siftydb = myclient["Siftly_Database"]
    ecommstores = siftydb["EcommStores"]

    return ecommstores