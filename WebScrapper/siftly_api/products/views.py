from grpc import Status
from .WebScrapper.MainWebScrapper import main_web_scrapper_with_driver
from .models import ecommstores_collection, products_collection
from django.http import HttpResponse, JsonResponse
from bson.json_util import dumps



def index(request):
    return HttpResponse("You are in the Ecomm Stores section")


def get_stores(request):
    stores = ecommstores_collection.find()
    stores = list(stores)

    # Convert ObjectId fields to strings
    stores = convert_objectid(stores)

    if not stores:
        return JsonResponse({
            'message': 'No stores found.'
        }, status=404)

    # Return the stores as a JSON response
    return JsonResponse(stores, safe=False)


# Utility to convert ObjectId to string
def convert_objectid(data):
    if isinstance(data, list):
        for item in data:
            if '_id' in item:  # Check if '_id' exists
                item['_id'] = str(item['_id'])
    elif isinstance(data, dict):
        if '_id' in data:  # Check if '_id' exists
            data['_id'] = str(data['_id'])
    return data


def web_scrapper(request, search_query):
    searched_products = main_web_scrapper_with_driver(search_query)

    if not searched_products:
        return JsonResponse({
            'message': 'No products found.',
            'products': []
        }, status=404)

    # Convert ObjectId to strings
    searched_products = [convert_objectid(product) for product in searched_products]

    response_data = {
        'message': 'Products scraped and added successfully!',
        'products': searched_products
    }

    return JsonResponse(response_data, status=200)


def get_products(request):
    products = products_collection.find()
    products = list(products)
    
    if not products:
        return JsonResponse({
            'message': "No products found"
        }, status=404)

    json_products = dumps(products)
    response_data = {
        'message': "Products",
        'products': json_products
    }
    return JsonResponse(response_data, status=200)


def search_products(request, search_string):
    if not search_string:
        return JsonResponse({'message': 'Please provide a search query.'}, status=400)

    search_results = products_collection.find({
        "title": {"$regex": search_string, "$options": "i"}  # Case-insensitive search
    })

    search_results = [
        {**product, '_id': str(product['_id'])} for product in search_results
    ]

    if not search_results:
        return JsonResponse({'message': 'No products found.'}, status=404)

    return JsonResponse({
        'message': 'Search results found!',
        'products': search_results
    }, status=200)


#   def add_store(request):
#     stores = [
#         {
#           "name": "Amazon",
#           "homepage": "https://www.amazon.in/",
#           "logo": "https://freelogopng.com/images/all_img/1688361055amazon-logo-png.png",
#           "niche": [
#             "everything",
#             "phone",
#             "laptop",
#             "shirts",
#             "tshirts",
#             "electronics",
#             "shoes",
#             "sneakers",
#             "watches",
#             "accessories"
#           ],
#           "offers": [
#             "Free Shipping above 500"
#           ],
#           "searching_page_tags": {
#             "searchbar": {
#               "tag": "input",
#               "xpath": "//*[@id=\"twotabsearchtextbox\"]"
#             },
#             "productgrid": {
#               "tag": "div",
#               "xpath": "//*[@id=\"search\"]/div[1]/div[1]/div/span[1]/div[1]"
#             },
#             "productlist": {
#               "tag": "div",
#               "id": "NA",
#               "class": "sg-col-20-of-24.s-result-item.s-asin.sg-col-0-of-12.sg-col-16-of-20.sg-col.s-widget-spacing-small.sg-col-12-of-16"
#             },
#             "productname": {
#               "tag": "span",
#               "id": "NA",
#               "class": "a-size-medium.a-color-base.a-text-normal"
#             },
#             "productimage": {
#               "tag": "img",
#               "id": "NA",
#               "class": "s-image"
#             },
#             "producturl": {
#               "tag": "a",
#               "id": "NA",
#               "class": "a-link-normal.s-no-outline"
#             },
#             "productprice": {
#               "tag": "span",
#               "id": "NA",
#               "class": "a-price-whole"
#             },
#             "product_no_of_ratings": {
#               "tag": "span",
#               "id": "NA",
#               "class": "a-size-base.s-underline-text"
#             },
#             "productratings": {
#               "tag": "span",
#               "id": "NA",
#               "class": "a-icon-alt"
#             },
#             "nextpagebutton": {
#               "class": "s-pagination-item.s-pagination-next.s-pagination-button.s-pagination-separator"
#             }
#           },
#           "products_page_tags": {
#             "product_name": {
#               "tag": "span",
#               "class": "a-size-large.product-title-word-break",
#               "xpath": "//*[@id=\"productTitle\"]"
#             },
#             "product_image": {
#               "tag": "img",
#               "class": "a-dynamic-image.a-stretch-vertical",
#               "xpath": "//*[@id=\"landingImage\"]"
#             },
#             "product_price": {
#               "tag": [
#                 "span",
#                 "span"
#               ],
#               "class": [
#                 "a-size-medium.a-color-success",
#                 "a-price-whole"
#               ],
#               "xpath": [
#                 "//*[@id=\"availability\"]/span[2]/span",
#                 "//*[@id=\"corePriceDisplay_desktop_feature_div\"]/div[1]/span[3]/span[2]/span[2]"
#               ]
#             },
#             "product_description": {},
#             "product_ratings": {
#               "tag": "span",
#               "class": "a-size-base.a-color-base",
#               "xpath": "//*[@id=\"acrPopover\"]/span[1]/a/span"
#             }
#           }
#         },
#         {
#           "name": "Flipkart",
#           "homepage": "https://www.flipkart.com/",
#           "logo": "https://th.bing.com/th/id/R.af1de3f2ed4972e46ab0e68dd9ab3ba8?rik=REx4C5jQDkv6bA&riu=http%3a%2f%2fassets.stickpng.com%2fimages%2f610673352ced4d0004ead4e5.png&ehk=9dETXKdo%2fRMEm1R2WhNn%2f9T0tPpXFDB5xYeCgTFpG2w%3d&risl=&pid=ImgRaw&r=0",
#           "niche": [
#             "everything",
#             "phone",
#             "laptop",
#             "shirts",
#             "electronics",
#             "tshirts",
#             "shoes",
#             "sneakers",
#             "watches",
#             "accessories"
#           ],
#           "offers": [
#             "Free shipping on orders above Rs.450"
#           ],
#           "searching_page_tags": {
#             "searchbar": {
#               "tag": "input",
#               "class": "Pke_EE",
#               "xpath": "//*[@id=\"container\"]/div/div[1]/div/div/div/div/div[1]/div/div/div/div[1]/div[1]/header/div[1]/div[2]/form/div/div/input"
#             },
#             "productgrid": {
#               "tag": "div",
#               "xpath": "//*[@id=\"container\"]/div/div[3]/div[1]/div[2]"
#             },
#             "productlist": {
#               "tag": "div",
#               "id": "NA",
#               "class": "cPHDOP.col-12-12"
#             },
#             "productname": {
#               "tag": "div",
#               "id": "NA",
#               "class": "KzDlHZ"
#             },
#             "productimage": {
#               "tag": "img",
#               "id": "NA",
#               "class": "DByuf4"
#             },
#             "producturl": {
#               "tag": "a",
#               "id": "NA",
#               "class": "CGtC98"
#             },
#             "productprice": {
#               "tag": "div",
#               "id": "NA",
#               "class": "Nx9bqj._4b5DiR"
#             },
#             "product_no_of_ratings": {
#               "tag": "span",
#               "id": "NA",
#               "class": "Wphh3N"
#             },
#             "productratings": {
#               "tag": "div",
#               "id": "NA",
#               "class": "XQDdHH"
#             },
#             "nextpagebutton": {
#               "class": "_9QVEpD"
#             }
#           },
#           "products_page_tags": {
#             "product_name": {
#               "tag": "span",
#               "class": "VU-ZEz",
#               "xpath": "//*[@id=\"container\"]/div/div[3]/div[1]/div[2]/div[2]/div/div[1]/h1/span"
#             },
#             "product_image": {
#               "tag": "img",
#               "class": "DByuf4.IZexXJ.jLEJ7H",
#               "xpath": "//*[@id=\"container\"]/div/div[3]/div[1]/div[1]/div[1]/div/div[1]/div[2]/div[1]/div[2]/img"
#             },
#             "product_price": {
#               "tag": "div",
#               "class": [
#                 "Nx9bqj",
#                 "CxhGGd"
#               ],
#               "xpath": "//*[@id=\"container\"]/div/div[3]/div[1]/div[2]/div[2]/div/div[3]/div[1]/div/div"
#             },
#             "product_description": {},
#             "product_ratings": {
#               "tag": "div",
#               "class": "XQDdHH",
#               "xpath": "//*[@id=\"productRating_LSTMOBH2HJG3HNTSRYTUHOV85_MOBH2HJG3HNTSRYT_\"]/div"
#             }
#           }
#         }
#     ]
#
#     ecommstores_collection.insert_many(stores)
#     return HttpResponse("Stores have been added.")