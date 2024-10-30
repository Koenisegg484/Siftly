from time import sleep
from selenium import webdriver
from selenium.common import NoSuchElementException
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

from WebScrapper.MainWebScrapper import add_to_database, element_exists, ecommstores
from WebScrapper.middlewares_fns import ratings

def printsWeb(abc):
    print("WebScrapper" + abc)

def tester():
    # Set up Chrome options
    chrome_options = Options()
    chrome_options.page_load_strategy = 'none'

    # Initialize the Chrome driver with the options
    driver = webdriver.Chrome(service=Service(), options=chrome_options)

    url = "https://www.flipkart.com/"
    searchquery = input("Enter Search: ")
    searchbar_xpath = '//*[@id="container"]/div/div[1]/div/div/div/div/div[1]/div/div/div/div[1]/div[1]/header/div[1]/div[2]/form/div/div/input'
    productgridclass = '//*[@id="container"]/div/div[3]/div[1]/div[2]'
    productlistclass = 'cPHDOP.col-12-12'

    # Product details
    linktag = 'CGtC98'
    imagetag = 'DByuf4'
    titleclass = 'KzDlHZ'
    priceclass = 'Nx9bqj._4b5DiR'

    driver.get(url)
    driver.maximize_window()

    sleep(5)


    # Find the search bar and enter the search query
    searchbar = WebDriverWait(driver, 10).until(
        EC.presence_of_element_located((By.XPATH, searchbar_xpath))
    )
    searchbar.send_keys(searchquery)
    searchbar.send_keys(Keys.ENTER)

    # Wait for the product grid to be present
    productgrid = WebDriverWait(driver, 10).until(
        EC.presence_of_element_located((By.XPATH, productgridclass))
    )

    # Find all products in the grid
    product_list = productgrid.find_elements(By.CLASS_NAME, productlistclass)

    toshow = []

    # Extract product details with error handling
    for product in product_list:
        try:
            eachproduct = {}
            eachproduct['link'] = product.find_element(By.CLASS_NAME, linktag).get_attribute('href')
            eachproduct['image'] = product.find_element(By.CLASS_NAME, imagetag).get_attribute('src')
            eachproduct['title'] = product.find_element(By.CLASS_NAME, titleclass).text
            eachproduct['price'] = product.find_element(By.CLASS_NAME, priceclass).text

            toshow.append(eachproduct)
        except Exception as e:
            print(f"Error processing product: {e}")

    # Print product details
    for product in toshow:
        print(f"Link: {product['link']}")
        print(f"Image: {product['image']}")
        print(f"Title: {product['title']}")
        print(f"Price: {product['price']}")
        print("-" * 40)

    print("Ending driver in 10 seconds")
    sleep(10)

    driver.quit()


def main_web_scrapper32():

    documents = ecommstores.find()

    # print (documents)

    searchQuery = str(input("Enter product to search : "))

    for doc in documents:

        if doc['name'] != 'Flipkart':
            continue

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
        print("Searched the query")

        productgrid_tags = doc['searching_page_tags']['productgrid']
        productlist_tags = doc['searching_page_tags']['productlist']

        toshow = []
        try:
            # print(driver.find_element(By.CLASS_NAME, nextpage).text)
            while element_exists(driver, By.CLASS_NAME, nextpage) and driver.find_element(By.CLASS_NAME, nextpage).text == "NEXT":

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
        except NoSuchElementException as ne:
            print(f"The Elements were not found\n\n{ne}")

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


def main_web_scrapper():

    documents = ecommstores.find()

    # print (documents)

    searchQuery = str(input("Enter product to search : "))

    for doc in documents:
        print(doc)

        if doc['name'] != 'Flipkart':
            continue

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
        next_page_tags = doc['searching_page_tags']['nextpagebutton']
        next_page = next_page_tags['class']
        searchBar.send_keys(searchQuery)
        searchBar.send_keys(Keys.ENTER)
        sleep(3)

        productgrid_tags = doc['searching_page_tags']['productgrid']
        productlist_tags = doc['searching_page_tags']['productlist']

        toshow = []
        try:


            while element_exists(driver, By.CLASS_NAME, next_page) and driver.find_element(By.CLASS_NAME, next_page).text == "Next":

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
                driver.find_element(By.CLASS_NAME, next_page).click()
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