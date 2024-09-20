import os
import pymongo as mongo
from EcommStores import ECommerceStore
from Products import Searching_Page_Tags


# connecting to mongodb
myclient = mongo.MongoClient("mongodb://localhost:27017")
siftydb = myclient["Siftly_Database"]
ecommstores = siftydb["EcommStores"]


# Function for adding the required ids and classes 
# for the elements needed for scrapping
def addproduct():

    search_bar = {}
    product_list = {}
    product_name = {}
    product_image = {}
    product_url = {}
    product_price = {}
    
    # This is for getting the search bar to search products
    search_bar['tag'] = input("Enter tag for search bar : ") or "NA"
    search_bar['fullXPath'] = input("Enter full X path for search bar: ")
    
    # This shall contain the list of products
    # Which will be iterated to get the below details
    product_list['tag'] = input("Enter tag for product list : ") or "NA"
    product_list['fullXPath'] = input("Enter full X path for search bar: ")
    
    # This is for the name of the product
    product_name['tag'] = input("Enter tag for product name : ") or "NA"
    product_name['id'] = input("Enter id for product name") or "NA"
    product_name['class'] = input("Enter class for product name") or "NA"
    product_name['fullXPath'] = input("Enter full X path for product name: ")
    
    # This is for the product image
    product_image['tag'] = input("Enter tag for search bar : ") or "NA"
    product_image['id'] = input("Enter id for product image") or "NA"
    product_image['class'] = input("Enter class for product image") or "NA"
    product_image['fullXPath'] = input("Enter full X path for search bar: ")
    
    # This is for the product url to 
    # redirect them to the main website page
    product_url['tag'] = input("Enter tag for search bar : ") or "NA"
    product_url['id'] = input("Enter id for product url") or "NA"
    product_url['class'] = input("Enter class for product url") or "NA"
    product_url['fullXPath'] = input("Enter full X path for search bar: ")
    
    # This for getting the price of the products
    product_price['tag'] = input("Enter tag for search bar : ") or "NA"
    product_price['id'] = input("Enter id for product price") or "NA"
    product_price['class'] = input("Enter class for product price") or "NA"
    product_price['fullXPath'] = input("Enter full X path for search bar: ")
    
    return Searching_Page_Tags(
        searchbar = search_bar,
        productlist = product_list,
        productname = product_name,
        productimage = product_image,
        producturl = product_url
        productprice = product_price
    ).convert_to_dict()
    


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

    searching_pages_tags = addproduct()
    os.system('cls' if os.name == 'nt' else 'clear')
    ecommstore = ECommerceStore(name=name, 
                                homepage=homepage,
                                logo=logo, 
                                niche=niches, 
                                offers=offers, 
                                searching_page_tags=searching_pages_tags).convert_to_dict()
    print(ecommstore)
    
    return ecommstore


# Function for inserting the store details on mongodb
def addtoDatabase(ecommstore):
    ecommstores.insert_one(ecommstore)
    return ecommstore['name']
    

choice = 1
while(choice != 0):
    choice = int(input("Enter choice, 0 for exit, 1 for add one more store : "))
    if choice == 1:
        name = addtoDatabase(addStore())
        print(f"The {name} store has been put in database.")
