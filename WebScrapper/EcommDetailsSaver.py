import os
import pymongo as mongo
from EcommStores import ECommerceStore
from Products import Product_tags

myclient = mongo.MongoClient("mongodb://localhost:27017")
siftydb = myclient["Siftly_Database"]
ecommstores = siftydb["EcommStores"]

'''
        product_dict = {
            "name": self.nametag,
            "description": self.descriptiontag,
            "link": self.linktag,
            "storename": self.ecommerceStoretag,
            "niche": self.nichetag,
            "imageslink": self.imageslinktag,
            "price": self.pricetag,
            "size": self.sizetag,
            "ratings": self.ratingstag,
            "offers": self.offerstag
        }
'''

def addproduct(storename):
    
    title = {}
    description = {}
    link = {}
    imageslink = {}
    price = {}
    size = {}
    ratings = {}
    offers = {}
    
    # Adding title
    title['tag'] = input("Enter tag for product name/title : ")
    title['classname'] = input("Enter class name for product : ")
    title['idname'] = input("Enter id for product : ") or None
    title['fullXPath'] = input("Enter full X path for product : ")

    
    description['tag'] = input("Enter tag for product description : ")
    description['classname'] = input("Enter class name for product description : ")
    description['idname'] = input("Enter id for product description : ") or None
    description['fullXPath'] = input("Enter full X path for product description : ")

    
    link['tag'] = input("Enter tag for the product link(the url) : ")
    link['classname'] = input("Enter class for the product link(the url) : ")
    link['idname'] = input("Enter id for the product link(the url) : ") or None
    link['fullXPath'] = input("Enter full X path for the product link(the url) : ")


    imageslink['tag'] = input("Enter tag for image section tag : ")
    imageslink['classname'] = input("Enter class for image section tag : ")
    imageslink['idname'] = input("Enter id for image section tag : ") or None
    imageslink['fullXPath'] = input("Enter full X path for image section tag : ")


    price['tag'] = input("Enter tag for price : ")
    price['classname'] = input("Enter class for price : ")
    price['idname'] = input("Enter id for price : ") or None
    price['fullXPath'] = input("Enter full X path for price : ")


    size['tag'] = input("Enter tag for size : ")
    size['classname'] = input("Enter class for size : ")
    size['idname'] = input("Enter id for size : ") or None
    size['fullXPath'] = input("Enter full X path for size : ")


    ratings['tag'] = input("Enter tag for ratings : ")
    ratings['classname'] = input("Enter class for ratings : ")
    ratings['idname'] = input("Enter id for ratings : ") or None
    ratings['fullXPath'] = input("Enter full X path for ratings : ")


    offers['tag'] = input("Enter tag for offers :")
    offers['classname'] = input("Enter class for offers :")
    offers['idname'] = input("Enter id for offers :") or None
    offers['fullXPath'] = input("Enter full X path for offers :")


    
    return Product_tags(title=title, description=description, link=link,
                        storename=storename, imageslink=imageslink,
                        price=price, size=size, ratings=ratings, offers=offers)

def addStore():
    name = input("Enter the name of Ecomm Site : ")
    homepage = input("Enter the link to the homepage : ")
    logo = input("Enter the link of the logo of the Ecomm Site : ")
    niche_num = int(input("Enter the number of niche the ecomm site has : "))
    niches = []
    i = 1
    while(niche_num != 0):
        niche = input(f"{i}. Enter niche : ")
        niches.append(niche)
        niche_num = niche_num - 1
        i = i+1
    print(niches)
    offers = []
    offer_num = int(input("Any Offers : "))
    i = 1
    while(offer_num != 0):
        offer = input(f"{i}. Enter Offer : ")
        offers.append(offer)
        offer_num = offer_num - 1
        i = i+1
    producttags = addproduct(storename=name).convert_to_dict()
    os.system('cls' if os.name == 'nt' else 'clear')
    ecommstore = ECommerceStore(name=name, homepage=homepage, logo=logo, niche=niches, offers=offers, producttags=producttags)
    print(ecommstore)
    
    return ecommstore.convert_to_dict()

def addtoDatabase(ecommstore):
    ecommstores.insert_one(ecommstore)
    return ecommstore['name']
    

choice = 1
while(choice != 0):
    choice = int(input("Enter choice, 0 for exit, 1 for add one more store : "))
    name = addtoDatabase(addStore())
    print(f"The {name} store has been put in database.")