import threading
import logging
from time import sleep

from .db_connect import db
# from db_connect import db


# Selenium Imports
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.common import NoSuchElementException
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

from .middlewares import format_price, format_ratings, ratings
# from middlewares import format_price, format_ratings, ratings

def element_exists(products, by, value):
    try:
        products.find_element(by, value)
        return True
    except NoSuchElementException:
        return False

# Calling mongodb connection
ecommstores = db['EcommStores']




def scrape_from_driver(doc, search_query, toshow):
    chrome_options = Options()
    chrome_options.page_load_strategy = 'none'
    driver = webdriver.Chrome(service=Service(), options=chrome_options)
    driver.maximize_window()

    url = doc['homepage']
    driver.get(url)
    sleep(3)

    searchbar_tags = doc['searching_page_tags']['searchbar']
    searchBar = WebDriverWait(driver, 7).until(
        EC.presence_of_element_located((By.XPATH, searchbar_tags['xpath']))
    )
    searchBar.send_keys(search_query)
    searchBar.send_keys(Keys.ENTER)
    sleep(3)

    productgrid_tags = doc['searching_page_tags']['productgrid']
    productlist_tags = doc['searching_page_tags']['productlist']

    # while element_exists(driver, By.CLASS_NAME, nextpage):
    productgrid = WebDriverWait(driver, 5).until(
        EC.presence_of_element_located((By.XPATH, productgrid_tags['xpath']))
    )
    productlist = productgrid.find_elements(By.CLASS_NAME, productlist_tags['class'])
    sleep(3)

    for products in productlist:
        title_tag = doc['searching_page_tags']['productname']
        image_tag = doc['searching_page_tags']['productimage']
        link_tag = doc['searching_page_tags']['producturl']
        price_tag = doc['searching_page_tags']['productprice']
        ratings_tag = doc['searching_page_tags']['productratings']
        no_of_ratings = doc['searching_page_tags']['product_no_of_ratings']

        try:
            eachproduct = {
                'title': products.find_element(By.CLASS_NAME, title_tag['class']).text,
                'platform': doc['name'],
                'link': products.find_element(By.CLASS_NAME, link_tag['class']).get_attribute('href'),
                'image': products.find_element(By.CLASS_NAME, image_tag['class']).get_attribute('src'),
                'price': format_price(products.find_element(By.CLASS_NAME, price_tag['class']).text),
                'ratings': ratings(products.find_element(By.CLASS_NAME, ratings_tag['class']).get_attribute(
                    'innerHTML')) if element_exists(products, By.CLASS_NAME, ratings_tag['class']) else '0',
                'no_of_ratings': format_ratings(products.find_element(By.CLASS_NAME,no_of_ratings['class']).text) if element_exists(products,By.CLASS_NAME,no_of_ratings['class']) else '0'}
            toshow.append(eachproduct)
            print("product added")
        except Exception as e:
            print(f"Error processing one product.")
            # print(f"Error processing platform {doc['name']}: {e}")
    driver.quit()


def main_web_scrapper_with_driver(search_query):

    threads = []
    toshow = []

    documents = ecommstores.find()

    for doc in documents:
        thread = threading.Thread(target=scrape_from_driver, args=(doc, search_query, toshow))
        threads.append(thread)
        thread.start()

    for thread in threads:
        thread.join()

    for product in toshow:
        print(f"Link: {product['link']}")
        print(f"Image: {product['image']}")
        print(f"Title: {product['title']}")
        print(f"Price: Rs.{product['price']}")
        print(f"Ratings: {product['ratings']}")
        print(f"No of ratings: {product['no_of_ratings']}")
        print("-" * 40)

    return toshow
    # print("Ending driver in 10 seconds")
    # sleep(10)

# main_web_scrapper_with_driver("acer nitro")






#
# def driver_Scraper(doc, searchquery, toshow):
#     chrrome_options = Options()
#     chrrome_options.page_load_strategy = 'none'
#     driver = webdriver.Chrome(service=Service(), options=chrrome_options)
#     driver.maximize_window()
#
#     # Open the Ecomm Platform
#     url = doc['homepage']
#     driver.get(url)
#
#     searchbar_tags = doc['searching_page_tags']['searchbar']
#     searchBar = WebDriverWait(driver, 7).until(
#         EC.presence_of_element_located((By.XPATH, searchbar_tags['xpath']))
#     )
#     searchBar.send_keys(searchquery)
#     searchBar.send_keys(Keys.ENTER)
#     sleep(3)
#
#     product_grid_tags = doc['searching_page_tags']['productgrid']
#     product_list_tags = doc['searching_page_tags']['productlist']
#
#     product_grid = WebDriverWait(driver, 5).until(
#         EC.presence_of_element_located((By.XPATH, product_grid_tags['xpath']))
#     )
#     product_list = product_grid.find_elements(By.CLASS_NAME, product_list_tags['class'])
#
#     for products in product_list:
#         title_tag = doc['searching_page_tags']['productname']
#         image_tag = doc['searching_page_tags']['productimage']
#         link_tag = doc['searching_page_tags']['producturl']
#         price_tag = doc['searching_page_tags']['productprice']
#         ratings_tag = doc['searching_page_tags']['productratings']
#         no_of_ratings = doc['searching_page_tags']['product_no_of_ratings']
#
#         try:
#             eachproduct = {
#                 'title': products.find_element(By.CLASS_NAME, title_tag['class']).text,
#                 'platform': doc['name'],
#                 'link': products.find_element(By.CLASS_NAME, link_tag['class']).get_attribute('href'),
#                 'image': products.find_element(By.CLASS_NAME, image_tag['class']).get_attribute('src'),
#                 'price': format_price(products.find_element(By.CLASS_NAME, price_tag['class']).text),
#                 'ratings': ratings(products.find_element(By.CLASS_NAME, ratings_tag['class']).get_attribute(
#                     'innerHTML')) if element_exists(products, By.CLASS_NAME, ratings_tag['class']) else '0',
#                 'no_of_ratings': format_ratings(products.find_element(By.CLASS_NAME,no_of_ratings['class']).text) if element_exists(products,By.CLASS_NAME,no_of_ratings['class']) else '0'}
#             toshow.append(eachproduct)
#         except Exception as e:
#             logging.error(f"Error processing one product: {e}")
#             # print(f"Error processing platform {doc['name']}: {e}")
#     sleep(3)
#     driver.quit()
#
# def scrapping_threader(search_query):
#
#     threads = []
#     toshow = []
#
#     stores = ecommstores.find()
#
#     print(stores)
#
#     for store in stores:
#         thread = threading.Thread(target=driver_Scraper, args=(store, search_query, toshow))
#         threads.append(thread)
#         thread.start()
#
#     for thread in threads:
#         thread.join()
#
#     return toshow
#
# scrapping_threader("acer nitro")