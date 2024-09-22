# This is for the searching page
class SearchingPageTags:

    def __init__(self, searchbar, productgrid, productlist, productname, productimage, producturl, productprice):
         self.searchbar = searchbar,
         self.productgrid = productgrid,
         self.productlist = productlist, 
         self.productname = productname, 
         self.productimage = productimage, 
         self.producturl = producturl, 
         self.productprice = productprice
    
    def convert_to_dict(self):
        search_page_dict = {
            "searchbar" : self.searchbar,
            "productgrid" : self.productgrid,
            "productlist" : self.productlist,
            "productname" : self.productname,
            "productimage" : self.productimage,
            "producturl" : self.producturl,
            "productprice" : self.productprice
        }

        return search_page_dict
    
# This is for the main page
class ProductPageTags:
    def __init__(
        self,
        product_name,
        product_image,
        product_price,
        product_description,
        product_ratings,
    ):
    
        self.product_name = product_name,
        self.product_image = product_image,
        self.product_price = product_price,
        self.product_description = product_description,
        self.product_ratings = product_ratings

    
    
    # Convert to a dictionary
    def convert_to_dict(self):
        product_dict = {

            "product_name" : self.product_name,
            "product_image" : self.product_image,
            "product_price" : self.product_price,
            "product_description" : self.product_description,
            "product_ratings" : self.product_ratings,

        }

        return product_dict