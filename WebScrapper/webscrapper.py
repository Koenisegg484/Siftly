import pymongo
import json
from time import sleep
import pymongo.mongo_client
from selenium import webdriver
import selenium
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

# Connects to the database, refers to the database of ecommerce stores
def connectToDb():
    conn = pymongo.MongoClient("mongodb://localhost:27017")
    siftlydb = conn["Siftly_Database"]
    
    return siftlydb["EcommStores"]

driver = webdriver.Chrome()

usersearch = input("What do you want to search : ")
searchResults = []

ecommdetails = connectToDb()
for obbj in ecommdetails.find({"niche" : usersearch}):
    searchResults.append(obbj)
    # print(obbj)
    print(obbj.get("producttags").get("title").get("classname"))

print("Starting web driver.")
# print(searchResults)

store = searchResults[0]

# Debugging: Print the XPath to ensure it's correct
xpath = store.get("producttags").get("searchbutton").get("fullXPath")
print(f"Using XPath: {xpath}")

# Wait for the element to be present
driver.get(store.get("homepage"))
try:
    searchbutton = WebDriverWait(driver, 10).until(
        EC.presence_of_element_located((By.XPATH, xpath))
    )
    print("Element found!")
    print(searchbutton)
except selenium.common.exceptions.TimeoutException:
    print("Element not found within the specified wait time.")

sleep(20)
print("Exitting web driver.")
driver.quit()