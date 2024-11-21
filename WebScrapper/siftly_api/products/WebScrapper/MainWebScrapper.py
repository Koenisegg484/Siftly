import threading
from time import sleep
from .db_connect import db
from datetime import datetime
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


def element_exists(products, by, value):
    try:
        products.find_element(by, value)
        return True
    except NoSuchElementException:
        return False

# Calling mongodb connection
ecommstores = db['EcommStores']
products_database = db['products']


def check_product_exists(item):
    # product_list_current = list(products_database.find())
    price_history_entry = {
        'datetime' : datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
        'price' : item['price']
    }
    existing_product = products_database.find_one({'title' : item['title']})
    if existing_product:
        products_database.update_one(
            {'title' : existing_product['title']},
            {
                '$set' : {'price' : item['price']},
                '$push' : {'price_history' : price_history_entry}
            }
        )
        print("Updated price history")
    else:
        item['price_history'] = [price_history_entry]
        products_database.insert_one(item)
        print("Added product to database")




def scrape_from_driver(doc, search_query, toshow):
    # Initialize the Chrome browser with headless option and custom settings
    chrome_options = Options()
    chrome_options.add_argument("--headless")
    chrome_options.add_argument("--disable-gpu")
    chrome_options.add_argument("--no-sandbox")
    chrome_options.page_load_strategy = 'eager'
    driver = webdriver.Chrome(service=Service(), options=chrome_options)
    driver.maximize_window()

    # Open the homepage URL
    driver.get(doc['homepage'])
    # driver.implicitly_wait(10)
    sleep(7)

    # Wait for and interact with the search bar
    searchbar_tags = doc['searching_page_tags']['searchbar']
    searchBar = WebDriverWait(driver, 7).until(
        EC.presence_of_element_located((By.XPATH, searchbar_tags['xpath']))
    )
    searchBar.send_keys(search_query)
    searchBar.send_keys(Keys.ENTER)
    sleep(10)

    # Wait for the product grid to load and retrieve product list elements
    productgrid_tags = doc['searching_page_tags']['productgrid']
    productlist_tags = doc['searching_page_tags']['productlist']
    productgrid = WebDriverWait(driver, 5).until(
        EC.presence_of_element_located((By.XPATH, productgrid_tags['xpath']))
    )
    productlist = productgrid.find_elements(By.CLASS_NAME, productlist_tags['class'])

    # Extract product details and add to the list
    title_tag = doc['searching_page_tags']['productname']
    image_tag = doc['searching_page_tags']['productimage']
    link_tag = doc['searching_page_tags']['producturl']
    price_tag = doc['searching_page_tags']['productprice']
    ratings_tag = doc['searching_page_tags']['productratings']
    no_of_ratings = doc['searching_page_tags']['product_no_of_ratings']
    for products in productlist:
        try:

            eachproduct = {
                'title': products.find_element(By.CLASS_NAME, title_tag['class']).text,
                'platform': doc['name'],
                'link': products.find_element(By.CLASS_NAME, link_tag['class']).get_attribute('href'),
                'image': products.find_element(By.CLASS_NAME, image_tag['class']).get_attribute('src'),
                'price': format_price(products.find_element(By.CLASS_NAME, price_tag['class']).text),
                'price_history': [{
                    'dateTime': datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
                    'price': products.find_element(By.CLASS_NAME, price_tag['class']).text
                }],
                'ratings': ratings(products.find_element(By.CLASS_NAME, ratings_tag['class']).get_attribute('innerHTML')) if element_exists(products, By.CLASS_NAME, ratings_tag['class']) else '0',
                'no_of_ratings': format_ratings(products.find_element(By.CLASS_NAME, no_of_ratings['class']).text) if element_exists(products, By.CLASS_NAME, no_of_ratings['class']) else '0'
            }
            check_product_exists(eachproduct)
            toshow.append(eachproduct)
        except Exception as e:
            print(f"Error processing one product.")
            continue
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
    return toshow