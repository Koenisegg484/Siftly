import os
import pymongo as mongo
from EcommStores import ECommerceStore
from Products import Product_tags

myclient = mongo.MongoClient("mongodb://localhost:27017")
siftydb = myclient["Siftly_Database"]
ecommstores = siftydb["EcommStores"]


def addproduct(storename):
    
    searchbar = {}
    title = {}
    description = {}
    link = {}
    imageslink = {}
    price = {}
    size = {}
    ratings = {}
    offers = {}
    products_grid = {}
    products_list = {}
    
    # Adding title
    searchbar['tag'] = input("Enter tag for search bar : ") or "NA"
    searchbar['classname'] = input("Enter class name for search bar : ") or "NA"
    searchbar['idname'] = input("Enter id for search bar : ") or None
    searchbar['fullXPath'] = input("Enter full X path for search bar: ")


    products_grid['tag'] = input("Enter tag for peoductt grid : ") or "NA"
    products_grid['classname'] = input("Enter class name for product grid : ") or "NA"
    products_grid['idname'] = input("Enter id for product grid : ") or None
    products_grid['fullXPath'] = input("Enter full X path for product grid : ")
    
    
    products_list['tag'] = input("Enter tag for product list : ") or "NA"
    products_list['classname'] = input("Enter class name for product list : ") or "NA"
    products_list['idname'] = input("Enter id for product list : ") or None
    products_list['fullXPath'] = input("Enter full X path for product list: ")
    
    
    title['tag'] = input("Enter tag for product name/title : ") or "NA"
    title['classname'] = input("Enter class name for product : ") or "NA"
    title['idname'] = input("Enter id for product : ") or None
    title['fullXPath'] = input("Enter full X path for product : ")

    
    description['tag'] = input("Enter tag for product description : ") or "NA"
    description['classname'] = input("Enter class name for product description : ") or "NA"
    description['idname'] = input("Enter id for product description : ") or None
    description['fullXPath'] = input("Enter full X path for product description : ")

    
    link['tag'] = input("Enter tag for the product link(the url) : ")  or "NA"
    link['classname'] = input("Enter class for the product link(the url) : ") or "NA"
    link['idname'] = input("Enter id for the product link(the url) : ") or None
    link['fullXPath'] = input("Enter full X path for the product link(the url) : ")


    imageslink['tag'] = input("Enter tag for image section tag : ") or "NA"
    imageslink['classname'] = input("Enter class for image section tag : ") or "NA"
    imageslink['idname'] = input("Enter id for image section tag : ") or None
    imageslink['fullXPath'] = input("Enter full X path for image section tag : ")


    price['tag'] = input("Enter tag for price : ") or "NA"
    price['classname'] = input("Enter class for price : ") or "NA"
    price['idname'] = input("Enter id for price : ") or None
    price['fullXPath'] = input("Enter full X path for price : ")


    size['tag'] = input("Enter tag for size : ") or "NA"
    size['classname'] = input("Enter class for size : ") or "NA"
    size['idname'] = input("Enter id for size : ") or None
    size['fullXPath'] = input("Enter full X path for size : ")


    ratings['tag'] = input("Enter tag for ratings : ") or "NA"
    ratings['classname'] = input("Enter class for ratings : ") or "NA"
    ratings['idname'] = input("Enter id for ratings : ") or None
    ratings['fullXPath'] = input("Enter full X path for ratings : ")


    offers['tag'] = input("Enter tag for offers :") or "NA"
    offers['classname'] = input("Enter class for offers :") or "NA"
    offers['idname'] = input("Enter id for offers :") or None
    offers['fullXPath'] = input("Enter full X path for offers :")

    
    return Product_tags(searchbar=searchbar ,title=title, description=description, link=link,
                        storename=storename, imageslink=imageslink,
                        price=price, size=size, ratings=ratings, offers=offers, products_grid=products_grid, products_list=products_list)

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






# PS C:\Users\shiva\OneDrive\Desktop\Siftly> python -u "c:\Users\shiva\OneDrive\Desktop\Siftly\WebScrapper\EcommDetailsSaver.py"
# Enter choice, 0 for exit, 1 for add one more store : 1
# Enter the name of Ecomm Site : RedWolf
# Enter the link to the homepage : https://www.redwolf.in/
# Enter the link of the logo of the Ecomm Site : https://www.redwolf.in/image/catalog/rw-logo-gif-transparent-red.gif
# Enter the number of niche the ecomm site has : 20
# 1. Enter niche : merchandise
# 2. Enter niche : marvel
# 3. Enter niche : marvel merchandise
# 4. Enter niche : anime merchandise
# 5. Enter niche : dadpool
# 6. Enter niche : wolverine
# 7. Enter niche : superheroes merchandise
# 8. Enter niche : oversized tshirts
# 9. Enter niche : tshirts
# 10. Enter niche : glow in the dark tshirts
# 13. Enter niche : hoodies
# 14. Enter niche : slogan tshirts
# 15. Enter niche : jackets
# 16. Enter niche : harry porter merchandise
# 17. Enter niche : cartoon merchandise
# 18. Enter niche : superman merchandise
# 19. Enter niche : batman merchandise
# 20. Enter niche : rick n morty
# ['merchandise', 'marvel', 'marvel merchandise', 'anime merchandise', 'dadpool', 'wolverine', 'superheroes merchandise', 'oversized tshirts', 'tshirts', 'glow in the dark tshirts', 'printed tshirts', 'spiderman tshirts', 'hoodies', 'slogan tshirts', 'jackets', 'harry porter merchandise', 'cartoon merchandise', 'superman merchandise', 'batman merchandise', 'rick n morty']        
# Any Offers : 0
# Enter tag for search bar : input
# Enter class name for search bar : 
# Enter id for search bar : 
# Enter full X path for search bar: /html/body/div[7]/div[8]/form/input[1]
# Enter tag for peoductt grid : div
# Enter class name for product grid : category-product-container
# Enter id for product grid :
# Enter full X path for product grid : //*[@id="content"]/div[1]
# Enter tag for product list : div
# Enter class name for product list : product-image
# Enter id for product list :
# Enter full X path for product list: //*[@id="product_17606"]
# Enter tag for product name/title : p
# Enter class name for product : product-name
# Enter id for product :
# Enter full X path for product : //*[@id="product_17606"]/a/p[1]
# Enter tag for product description : h4
# Enter class name for product description : artwork-info
# Enter id for product description :
# Enter full X path for product description : //*[@id="product-container"]/div[2]/div[3]/h4
# Enter tag for the product link(the url) : a
# Enter class for the product link(the url) :
# Enter id for the product link(the url) :
# Enter full X path for the product link(the url) : //*[@id="product_17606"]/a
# Enter tag for image section tag : img
# Enter class for image section tag : custom-img-responsive            
# Enter id for image section tag :
# Enter full X path for image section tag : //*[@id="product_17606"]/a/img[1]
# Enter tag for price : span
# Enter class for price : price-new
# Enter id for price :
# Enter full X path for price : //*[@id="product_17606"]/a/span[1]
# Enter tag for size : div
# Enter class for size :
# Enter id for size : input-option-27749
# Enter full X path for size : //*[@id="input-option-27749"]
# Enter tag for ratings : div
# Enter class for ratings : rating
# Enter id for ratings :
# Enter full X path for ratings : //*[@id="product-container"]/div[2]/div[3]/div[6]
# Enter tag for offers :div
# Enter class for offers :save
# Enter id for offers :
# Enter full X path for offers ://*[@id="product-container"]/div[2]/div[3]/a[2]/div/div[2]