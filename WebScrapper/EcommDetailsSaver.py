import os
from MongoConnect import get_db
from EcommStores import ECommerceStore
from Products import SearchingPageTags
from Products import ProductPageTags


# Program for taking a list as an input
def returns_list(name11):

    a = int(input(f"Enter 1 to add item in the {name11}, and 0 to exit : "))
    identifierList = []
    while a != 0:
        addInList = input("Enter item to put in list : ")
        identifierList.append(addInList)
        a = int(input(f"Enter 1 to add item in the {name11}, and 0 to exit : "))

    return identifierList


# connecting to mongodb
ecommstores = get_db()


# Function for adding the required ids and classes 
# for the elements needed for scrapping
def addSearchPageDetails():

    # These are for saving the elements of searching page
    search_bar = {}
    product_grid = {}
    product_list = {}
    product_name = {}
    product_image = {}
    product_url = {}
    product_price = {}

    # The hierarchy goes as following:
    # searchbar
    # productgrid
    #       //The products are inside the grid, and these
    #       //products are represented by the productlist,
    #       //from which the details are extracted
    #   productlist
    #       name
    #       image link
    #       product link
    #       price
    
    # This is for getting the search bar to search products
    search_bar['tag'] = input("Enter tag for search bar : ")
    search_bar['class'] = input("Enter class name for search bar : ")
    search_bar['xpath'] = input("Enter full X path for search bar: ")
    
    # This shall contain the list of products
    # Which will be iterated to get the below details
    product_grid['tag'] = input("Enter tag for product grid : ")
    product_grid['xpath'] = input("Enter full X path for product grid: ")
    
    # This contains the details of product
    product_list['tag'] = input("Enter tag for product list  : ")
    product_list['id'] = input("Enter id for product list :") or "NA"
    product_list['class'] = input("Enter class for product list :")
    
    # This is for the name of the product
    product_name['tag'] = input("Enter tag for product name : ")
    product_name['id'] = input("Enter id for product name : ") or "NA"
    product_name['class'] = input("Enter class for product name : ")
    # product_name['xpath'] = input("Enter full X path for product name: ")
    
    # This is for the product image
    product_image['tag'] = input("Enter tag for product image : ")
    product_image['id'] = input("Enter id for product image : ") or "NA"
    product_image['class'] = input("Enter class for product image : ")
    # product_image['xpath'] = input("Enter full X path for product image : ")
    
    # This is for the product url to 
    # redirect them to the main website page
    product_url['tag'] = input("Enter tag for product url : ")
    product_url['id'] = input("Enter id for product url : ")
    product_url['class'] = input("Enter class for product url : ")
    # product_url['xpath'] = input("Enter full X path for product url: ")
    
    # This for getting the price of the products
    product_price['tag'] = input("Enter tag for product price : ")
    product_price['id'] = input("Enter id for product price : ")
    product_price['class'] = input("Enter class for product price : ")
    # product_price['xpath'] = input("Enter full X path for search bar : ")
    
    return SearchingPageTags(
        searchbar = search_bar,
        productgrid= product_grid,
        productlist = product_list,
        productname = product_name,
        productimage = product_image,
        producturl = product_url,
        productprice = product_price
    ).convert_to_dict()
    

def addProductPageDetails():
    # These are for saving the elements of main product page
    product_name = {}
    product_image = {}
    product_price = {}
    product_description = {}
    product_ratings = {}

    print("Now, the below are the identifiers for the main products page .")
    print("-" * 25)

#   This is for getting the product_name
    product_name['tag'] = input("Enter tag for product_name : ")
    product_name['class'] = input("Enter class name for product_name : ")
    product_name['xpath'] = input("Enter x path for product_name : ")


#   This is for getting the product_image
    product_image['tag'] = input("Enter tag for product_image : ")
    product_image['class'] = input("Enter class name for product_image : ")
    product_image['xpath'] = input("Enter x path for product_image : ")


#   This is for getting the product_price
    product_price['tag'] = returns_list("Product Price tag : ")
    product_price['class'] = returns_list("Product Price class name : ")
    product_price['xpath'] = returns_list("Product Price xpath : ")


# #   This is for getting the product_description
#     product_description['tag'] = input("Enter tag for product_description : ")
#     product_description['class'] = input("Enter class name for product_description : ")
#     product_description['xpath'] = input("Enter x path for product_description : ")


#   This is for getting the product_ratings
    product_ratings['tag'] = input("Enter tag for product_ratings : ")
    product_ratings['class'] = input("Enter class name for product_ratings : ")
    product_ratings['xpath'] = input("Enter xpath for product_ratings : ")

    return ProductPageTags(
        product_name=product_name,
        product_image=product_image,
        product_price=product_price,
        product_description=product_description,
        product_ratings=product_ratings,
    ).convert_to_dict()




def addStore():
    name1 = input("Enter the name of Ecomm Site : ")
    homepage = input("Enter the link to the homepage : ")
    logo = input("Enter the link of the logo of the Ecomm Site : ")
    niche_num = int(input("Enter the number of niche the ecomm site has : "))

    niches = []
    i = 1
    while niche_num != 0:
        niche = input(f"{i}. Enter niche : ")
        niches.append(niche)
        niche_num = niche_num - 1
        i = i+1
    print(niches)

    offers = []
    offer_num = int(input("Any Offers : "))
    i = 1
    while offer_num != 0:
        offer = input(f"{i}. Enter Offer : ")
        offers.append(offer)
        offer_num = offer_num - 1
        i = i+1

    searching_pages_tags = addSearchPageDetails()
    products_page_tags = addProductPageDetails()

    os.system('cls' if os.name == 'nt' else 'clear')
    ecommstore = ECommerceStore(name=name1,
                                homepage=homepage,
                                logo=logo, 
                                niche=niches, 
                                offers=offers, 
                                searching_page_tags=searching_pages_tags,
                                products_page_tags=products_page_tags
                                ).convert_to_dict()
    print(ecommstore)
    
    return ecommstore


# Function for inserting the store details on mongodb
def addtoDatabase(ecommstore):
    ecommstores.insert_one(ecommstore)
    return ecommstore['name']
    

if __name__ == '__main__':
    choice = 1
    while choice != 0:
        choice = int(input("Enter choice, 0 for exit, 1 for add one more store : "))
        if choice == 1:
            name = addtoDatabase(addStore())
            print(f"The {name} store has been put in database.")



# Enter choice, 0 for exit, 1 for add one more store : 1
# Enter the name of Ecomm Site : Amazon
# Enter the link to the homepage : https://www.amazon.in/
# Enter the link of the logo of the Ecomm Site : https://freelogopng.com/images/all_img/1688361055amazon-logo-png.png
# Enter the number of niche the ecomm site has : 10
# 1. Enter niche : phone
# 2. Enter niche : laptop
# 3. Enter niche : shirts
# 4. Enter niche : tshirts
# 5. Enter niche : electronics
# 6. Enter niche : kitchen stuff
# 7. Enter niche : sneakers
# 8. Enter niche : shoes
# 9. Enter niche : watches
# 10. Enter niche : accessories
# ['phone', 'laptop', 'shirts', 'tshirts', 'electronics', 'kitchen stuff', 'sneakers', 'shoes', 'watches', 'accessories']
# Any Offers : 0
# Enter tag for search bar : input
# Enter class name for search bar : nav-input.nav-progressive-attribute
# Enter full X path for search bar: //*[@id="twotabsearchtextbox"]
# Enter tag for product grid : div
# Enter full X path for product grid: //*[@id="search"]/div[1]/div[1]/div/span[1]/div[1]
# Enter tag for product list  : div
# Enter id for product list :NA
# Enter class for product list :sg-col-20-of-24.s-result-item.s-asin.sg-col-0-of-12.sg-col-16-of-20.sg-col.s-widget-spacing-small.sg-col-12-of-16
# Enter tag for product name : span
# Enter id for product name : NA
# Enter class for product name : a-size-medium.a-color-base.a-text-normal
# Enter tag for product image : img
# Enter id for product image : NA
# Enter class for product image : s-image
# Enter tag for product url : a
# Enter id for product url : NA
# Enter class for product url : a-link-normal.s-no-outline
# Enter tag for search bar : span
# Enter id for product priceNA
# Enter class for product price
# Enter tag for product_name : span
# Enter class name for product_name : a-size-large.product-title-word-break
# Enter x path for product_name : //*[@id="productTitle"]
# Enter tag for product_image : img
# Enter class name for product_image : a-dynamic-image.a-stretch-vertical
# Enter x path for product_image : //*[@id="landingImage"]
# Enter 1 to add item in the Product Price tag : , and 0 to exit : 1
# Enter item to put in list : span
# Enter 1 to add item in the Product Price tag : , and 0 to exit : 1
# Enter item to put in list : span
# Enter 1 to add item in the Product Price tag : , and 0 to exit : 0
# Enter 1 to add item in the Product Price class name : , and 0 to exit : 1
# Enter item to put in list : a-size-medium.a-color-success
# Enter 1 to add item in the Product Price class name : , and 0 to exit : 1
# Enter item to put in list : a-price-whole
# Enter 1 to add item in the Product Price class name : , and 0 to exit : 0
# Enter 1 to add item in the Product Price xpath : , and 0 to exit : 1
# Enter item to put in list : //*[@id="availability"]/span[2]/span
# Enter 1 to add item in the Product Price xpath : , and 0 to exit : 1
# Enter item to put in list : //*[@id="corePriceDisplay_desktop_feature_div"]/div[1]/span[3]/span[2]/span[2]
# Enter 1 to add item in the Product Price xpath : , and 0 to exit : 0
# Enter tag for product_description : NA
# Enter class name for product_description : NA
# Enter x path for product_description : NA
# Enter tag for product_ratings : span
# Enter class name for product_ratings : a-size-base.a-color-base
# Enter xpath for product_ratings : //*[@id="acrPopover"]/span[1]/a/span
# Traceback (most recent call last):
#   File "c:\Users\shiva\OneDrive\Desktop\Siftly\WebScrapper\EcommDetailsSaver.py", line 202, in <module>
#     while choice != 0:
#
#   File "c:\Users\shiva\OneDrive\Desktop\Siftly\WebScrapper\EcommDetailsSaver.py", line 176, in addStore
#     i = i+1
#
#   File "c:\Users\shiva\OneDrive\Desktop\Siftly\WebScrapper\EcommDetailsSaver.py", line 146, in addProductPageDetails
#     product_price=product_price,
#   ^^^^^^^^^^^^^^^^^
#   File "c:\Users\shiva\OneDrive\Desktop\Siftly\WebScrapper\Products.py", line 54, in convert_to_dict
#     "product_offers" : self.product_offers
#                        ^^^^^^^^^^^^^^^^^^^
# AttributeError: 'ProductPageTags' object has no attribute 'product_offers'
# PS C:\Users\shiva\OneDrive\Desktop\Siftly>