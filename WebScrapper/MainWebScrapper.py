import os
import csv
import threading
from time import sleep

# MongoDB Imports
from MongoConnect import get_db

# Selenium Imports
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.common import NoSuchElementException
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

from WebScrapper.middlewares_fns import format_price, format_ratings, ratings


def element_exists(products, by, value):
    try:
        products.find_element(by, value)
        return True
    except NoSuchElementException:
        return False


def add_to_database(product):
    filename = '../database/ProductsRecommendationsForML.csv'
    directory = os.path.dirname(filename)
    if not os.path.exists(directory):
        os.makedirs(directory)
    # Open the file in append mode with UTF-8 encoding
    with open(filename, "a+", newline='', encoding='utf-8') as file:
        writer = csv.DictWriter(file, fieldnames=product.keys())
        if file.tell() == 0:
            writer.writeheader()
        writer.writerow(product)


# Connecting to Mongo Database, this refers to the Ecommerce Stores doc reference
ecommstores = get_db()



def scrape_platform(doc, search_query, driver, toshow):
    try:
        # Open a new tab for each platform
        driver.execute_script("window.open('');")
        driver.switch_to.window(driver.window_handles[-1])

        url = doc['homepage']
        driver.get(url)
        sleep(3)

        searchbar_tags = doc['searching_page_tags']['searchbar']
        searchBar = driver.find_element(By.XPATH, searchbar_tags['xpath'])
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
            except Exception as e:
                print(f"Error processing one product.")

        # print("Going to next page")
        # driver.find_element(By.CLASS_NAME, next_page).click()
        sleep(5)

    except Exception as e:
        print(f"Error processing platform {doc['name']}: {e}")

    # Print and add product details to the database
    for product in toshow:
        print(f"Link: {product['link']}")
        print(f"Image: {product['image']}")
        print(f"Title: {product['title']}")
        print(f"Price: Rs.{product['price']}")
        print(f"Ratings: {product['ratings']}")
        print(f"No of ratings: {product['no_of_ratings']}")
        print("+" * 40)
        add_to_database(product)


def test_main_web_scrapper2():

    toshow = []

    documents = ecommstores.find()
    searchQuery = str(input("Enter product to search : "))

    # Initialize a single WebDriver
    chrome_options = Options()
    chrome_options.page_load_strategy = 'none'
    driver = webdriver.Chrome(service=Service(), options=chrome_options)
    driver.maximize_window()

    # Create threads for each e-commerce platform
    threads = []
    for doc in documents:
        thread = threading.Thread(target=scrape_platform, args=(doc, searchQuery, driver, toshow))
        threads.append(thread)
        thread.start()
        sleep(4)

    # Wait for all threads to finish
    for thread in threads:
        thread.join()

    print("Ending driver in 10 seconds")
    sleep(10)
    driver.quit()


def scrape_from_driver(doc, search_query, toshow):
    chrome_options = Options()
    chrome_options.page_load_strategy = 'none'
    driver = webdriver.Chrome(service=Service(), options=chrome_options)
    driver.maximize_window()

    url = doc['homepage']
    driver.get(url)
    sleep(3)

    searchbar_tags = doc['searching_page_tags']['searchbar']
    searchBar = driver.find_element(By.XPATH, searchbar_tags['xpath'])
    # nextpage_tags = doc['searching_page_tags']['nextpagebutton']
    # nextpage = nextpage_tags['class']
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
        except Exception as e:
            print(f"Error processing one product.")
            # print(f"Error processing platform {doc['name']}: {e}")

    sleep(5)
    driver.quit()


def main_web_scrapper_with_driver():

    search_query = input("Enter product to search : ")

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
        add_to_database(product)

    print("Ending driver in 10 seconds")
    sleep(10)


# main_web_scrapper_with_driver()