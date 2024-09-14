# from selenium import webdriver
# from time import sleep
# from selenium.webdriver.common.by import By
# from selenium.webdriver.common.keys import Keys

# from selenium.webdriver.chrome.service import Service
# from selenium.webdriver.chrome.options import Options

# # Set up Chrome options
# chrome_options = Options()
# chrome_options.page_load_strategy = 'none'

# # Initialize the Chrome driver with the options
# driver = webdriver.Chrome(service=Service(), options=chrome_options)

# driver.get("https://www.redwolf.in/")
# driver.maximize_window()

# searchquery = input("Enter Search : ")

# searchbar = '/html/body/div[7]/div[8]/form/input[1]'


# print("With the classname")
# searchbar = driver.find_element(By.XPATH, searchbar)
# driver.implicitly_wait(5)
# searchbar.send_keys(searchquery)
# searchbar.send_keys(Keys.ENTER)
# driver.implicitly_wait(5)

# productgrid = driver.find_element(By.CLASS_NAME, 'container.category_container.category_container_bg')
# product_list = productgrid.find_elements(By.CLASS_NAME, 'clearfix')
# driver.implicitly_wait(5)
# toshow = []

# # print(product_list.text)
# for product in product_list:
#     eachproduct = {}
#     eachproduct['link'] = product.find_element(By.TAG_NAME, 'a').get_attribute('href')
#     eachproduct['image'] = product.find_element(By.TAG_NAME, 'img').get_attribute('src')
#     eachproduct['title'] = product.find_element(By.CLASS_NAME, 'product-name').text
#     eachproduct['price'] = product.find_element(By.CLASS_NAME, 'price-new').text
    
#     toshow.append(eachproduct)

# for product in toshow:
#     print(f"Link: {product['link']}")
#     print(f"Image: {product['image']}")
#     print(f"Title: {product['title']}")
#     print(f"Price: {product['price']}")
#     print("-" * 40)


# print("Ending driver in 10 seconds")
# sleep(10)

# driver.quit()

from time import sleep
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

# Set up Chrome options
chrome_options = Options()
chrome_options.page_load_strategy = 'none'

# Initialize the Chrome driver with the options
driver = webdriver.Chrome(service=Service(), options=chrome_options)

driver.get("https://www.redwolf.in/")
driver.maximize_window()

searchquery = input("Enter Search: ")

searchbar_xpath = '/html/body/div[7]/div[8]/form/input[1]'

# Find the search bar and enter the search query
searchbar = WebDriverWait(driver, 10).until(
    EC.presence_of_element_located((By.XPATH, searchbar_xpath))
)
searchbar.send_keys(searchquery)
searchbar.send_keys(Keys.ENTER)

# Wait for the product grid to be present
productgrid = WebDriverWait(driver, 10).until(
    EC.presence_of_element_located((By.CLASS_NAME, 'category-product-container'))
)

# Find all products in the grid
product_list = productgrid.find_elements(By.CLASS_NAME, 'product-image')

toshow = []

# Extract product details with error handling
for product in product_list:
    try:
        eachproduct = {}
        eachproduct['link'] = product.find_element(By.TAG_NAME, 'a').get_attribute('href')
        eachproduct['image'] = product.find_element(By.TAG_NAME, 'img').get_attribute('src')
        eachproduct['title'] = product.find_element(By.CLASS_NAME, 'product-name').text
        eachproduct['price'] = product.find_element(By.CLASS_NAME, 'price-new').text
        
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
