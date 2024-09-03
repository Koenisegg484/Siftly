from selenium import webdriver
from time import sleep
from selenium.webdriver.common.by import By
from selenium.webdriver.common.keys import Keys


driver = webdriver.Chrome()

driver.get("https://www.bewakoof.com/")
driver.fullscreen_window()

searchquery = input("Enter Search : ")

search_xpath = 'searchInput form-controls'
searchbar = '//*[@id="app"]/div/div[2]/div[1]/header/div[2]/div/div[3]/div[2]/div/form/input'


print("With the classname")
searchbar = driver.find_element(By.XPATH, searchbar)
driver.implicitly_wait(5)
searchbar.send_keys(searchquery)
searchbar.send_keys(Keys.ENTER)
driver.implicitly_wait(5)

productgrid = driver.find_element(By.XPATH, '//*[@id="productGrid"]')
product_list = productgrid.find_elements(By.CLASS_NAME, 'plp-product-card')
driver.implicitly_wait(5)
toshow = []
for product in product_list:
    eachproduct = {}
    eachproduct['link'] = product.find_element(By.CLASS_NAME, 'col-sm-4.col-xs-6.px-2').get_attribute('href')
    eachproduct['image'] = product.find_element(By.TAG_NAME, 'img').get_attribute('src')
    eachproduct['title'] = product.find_element(By.CLASS_NAME, 'clr-shade4.h3-p-name.undefined.false').text
    eachproduct['price'] = product.find_element(By.CLASS_NAME, 'discountedPriceText.clr-p-black.false').text
    
    toshow.append(eachproduct)

for product in toshow:
    print(f"Link: {product['link']}")
    print(f"Image: {product['image']}")
    print(f"Title: {product['title']}")
    print(f"Price: {product['price']}")
    print("-" * 40)


print("Ending driver in 10 seconds")
sleep(10)

driver.quit()
