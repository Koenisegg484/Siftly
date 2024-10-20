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

    # These are for saving the elements of searching page

    # This is for getting the search bar to search products
    search_bar = {
        'tag' : input("Enter tag for search bar : "),
        'class' : input("Enter class name for search bar : "),
        'xpath' : input("Enter full X path for search bar: "),
    }

    # This shall contain the list of products
    # Which will be iterated to get the below details
    product_grid = {
        'tag' : input("Enter tag for product grid : "),
        'xpath' : input("Enter full X path for product grid: "),
    }

    # This contains the details of product
    product_list = {
        'tag' : input("Enter tag for product list  : "),
        'id' : input("Enter id for product list :") or "NA",
        'class' : input("Enter class for product list :"),
    }

    # This is for the name of the product
    product_name = {
        'tag' : input("Enter tag for product name : "),
        'id' : input("Enter id for product name : ") or "NA",
        'class' : input("Enter class for product name : "),
    }

    # This is for the product image
    product_image = {
        'tag' : input("Enter tag for product image : "),
        'id' : input("Enter id for product image : ") or "NA",
        'class' : input("Enter class for product image : "),
    }

    # This is for the product url to
    # redirect them to the main website page
    product_url = {
        'tag' : input("Enter tag for product url : "),
        'id' : input("Enter id for product url : "),
        'class' : input("Enter class for product url : "),
    }

    # This for getting the price of the products
    product_price = {
        'tag' : input("Enter tag for product price : "),
        'id' : input("Enter id for product price : "),
        'class' : input("Enter class for product price : "),
    }

    # This for getting the price of the products
    product_no_of_ratings = {
        'tag' : input("Enter tag for no of ratings : "),
        'id' : input("Enter id for no of ratings : "),
        'class' : input("Enter class for no of ratings : "),
    }

    # This for getting the price of the products
    product_ratings = {
        'tag' : input("Enter tag for product ratings : "),
        'id' : input("Enter id for product ratings : "),
        'class' : input("Enter class for product ratings : "),
    }

    # This for getting the price of the products
    nextPageButton = {
        'class' : input("Enter class for next page button : "),
    }
    
    return SearchingPageTags(
        searchbar = search_bar,
        productgrid= product_grid,
        productlist = product_list,
        productname = product_name,
        productimage = product_image,
        producturl = product_url,
        productprice = product_price,
        product_no_of_ratings = product_no_of_ratings,
        productratings = product_ratings,
        nextpagebutton = nextPageButton
    ).convert_to_dict()
    

def addProductPageDetails():

    print("Now, the below are the identifiers for the main products page .")
    print("-" * 25)

    # These are for saving the elements of main product page
    product_name = {
        #   This is for getting the product_name
        'tag' : input("Enter tag for product_name : "),
        'class' : input("Enter class name for product_name : "),
        'xpath' : input("Enter x path for product_name : "),

    }

    product_image = {
        #   This is for getting the product_image
        'tag' : input("Enter tag for product_image : "),
        'class' : input("Enter class name for product_image : "),
        'xpath' : input("Enter x path for product_image : "),

    }

    product_price = {
        #   This is for getting the product_price
        'tag' : returns_list("Product Price tag : "),
        'class' : returns_list("Product Price class name : "),
        'xpath' : returns_list("Product Price xpath : "),

    }

    product_description = {
        # #   This is for getting the product_description
        #     product_description['tag'] = input("Enter tag for product_description : ")
        #     product_description['class'] = input("Enter class name for product_description : ")
        #     product_description['xpath'] = input("Enter x path for product_description : ")
    }

    product_ratings = {
        #   This is for getting the product_ratings
        'tag' : input("Enter tag for product_ratings : "),
        'class' : input("Enter class name for product_ratings : "),
        'xpath' : input("Enter xpath for product_ratings : "),

    }


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