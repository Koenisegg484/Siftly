import os
import csv
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

from WebScrapper.middlewares_fns import ratings, prices_formatter


def element_exists(products, by, value):
    try:
        products.find_element(by, value)
        return True
    except NoSuchElementException:
        return False



def add_to_database(product):
    # Define the filename and directory
    filename = '../database/ProductsRecommendationsForML.csv'
    directory = os.path.dirname(filename)

    # Create the directory if it doesn't exist
    if not os.path.exists(directory):
        os.makedirs(directory)

    # Open the file in append mode
    with open(filename, "a+", newline='') as file:
        writer = csv.DictWriter(file, fieldnames=product.keys())

        if file.tell() == 0:
            writer.writeheader()

        writer.writerow(product)


# Connecting to Mongo Database, this refers to the Ecommerce Stores doc reference
ecommstores = get_db()

def main_web_scrapper():

    documents = ecommstores.find()

    print (documents)

    searchQuery = str(input("Enter product to search : "))

    for doc in documents:
        print(doc)

        # Initialising web driver for scrapping
        chrome_options = Options()
        chrome_options.page_load_strategy = 'none'
        driver = webdriver.Chrome(service=Service(), options=chrome_options)
        driver.maximize_window()

        url = doc['homepage']
        # print(f"Printing URL => {url}")

        driver.get(url)
        sleep(3)

        searchbar_tags = doc['searching_page_tags']['searchbar']
        searchBar = driver.find_element(By.XPATH, searchbar_tags['xpath'])
        nextpage_tags = doc['searching_page_tags']['nextpagebutton']
        nextpage = nextpage_tags['class']
        searchBar.send_keys(searchQuery)
        searchBar.send_keys(Keys.ENTER)
        sleep(3)

        productgrid_tags = doc['searching_page_tags']['productgrid']
        productlist_tags = doc['searching_page_tags']['productlist']

        toshow = []
        try:


            while element_exists(driver, By.CLASS_NAME, nextpage):

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
                            'price': prices_formatter(products.find_element(By.CLASS_NAME, price_tag['class']).text),
                            'ratings': ratings(products.find_element(By.CLASS_NAME, ratings_tag['class']).get_attribute('innerHTML')) if element_exists(products, By.CLASS_NAME, ratings_tag['class']) else '0',
                            'no_of_ratings': products.find_element(By.CLASS_NAME,no_of_ratings['class']).text if element_exists(products,By.CLASS_NAME,no_of_ratings['class']) else '0'
                        }
                        print(f"Link: {eachproduct['link']}")
                        print(f"Image: {eachproduct['image']}")
                        print(f"Title: {eachproduct['title']}")
                        print(f"Price: Rs.{eachproduct['price']}")
                        print(f"Ratings: {eachproduct['ratings']}")
                        print(f"No of ratings: {eachproduct['no_of_ratings']}")
                        print("-" * 40)
                        toshow.append(eachproduct)
                    except Exception as e:
                        print(f"Error processing one product.")
                        # print(f"Error processing product: {e}")
                print("Going to next page")
                driver.find_element(By.CLASS_NAME, nextpage).click()
                sleep(5)

        except NoSuchElementException:
            print("The Elements were not found")

        # Print product details
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

        driver.quit()


main_web_scrapper()