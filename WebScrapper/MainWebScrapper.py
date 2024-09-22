from time import sleep

from selenium.common import NoSuchElementException

# MongoDB Imports
from MongoConnect import get_db

# Selenium Imports
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC


# Connecting to Mongo Database, this refers to the EcommStores doc reference
ecommstores = get_db()

documents = ecommstores.find()

print (documents)

serchQuery = str(input("Enter product to search : "))

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

    searchbar_tags = doc['searching_page_tags']['searchbar'][0]
    searchBar = driver.find_element(By.XPATH, searchbar_tags['xpath'])
    searchBar.send_keys(serchQuery)
    searchBar.send_keys(Keys.ENTER)
    sleep(3)

    productgrid_tags = doc['searching_page_tags']['productgrid'][0]
    productlist_tags = doc['searching_page_tags']['productlist'][0]

    try:

        productgrid = WebDriverWait(driver, 5).until(
            EC.presence_of_element_located((By.XPATH, productgrid_tags['xpath']))
        )
        productlist = productgrid.find_elements(By.CLASS_NAME, productlist_tags['class'])

        toshow = []
        for products in productlist:
            title_tag = doc['searching_page_tags']['productname'][0]
            image_tag = doc['searching_page_tags']['productimage'][0]
            link_tag = doc['searching_page_tags']['producturl'][0]
            price_tag = doc['searching_page_tags']['productprice']

            try:
                eachproduct = {}
                eachproduct['link'] = products.find_element(By.CLASS_NAME, link_tag['class']).get_attribute('href')
                eachproduct['image'] = products.find_element(By.CLASS_NAME, image_tag['class']).get_attribute('src')
                eachproduct['title'] = products.find_element(By.CLASS_NAME, title_tag['class']).text
                eachproduct['price'] = products.find_element(By.CLASS_NAME, price_tag['class']).text

                toshow.append(eachproduct)
            except Exception as e:
                print(f"Error processing one product.")
                # print(f"Error processing product: {e}")
    except NoSuchElementException as noElementFound:
        print("The Elements were not found")

    # Print product details
    for product in toshow:
        print(f"Link: {product['link']}")
        print(f"Image: {product['image']}")
        print(f"Title: {product['title']}")
        print(f"Price: Rs.{product['price']}")
        print("-" * 40)

    print("Ending driver in 10 seconds")
    sleep(10)

    driver.quit()




