class Searching_Page_Tags:

    def __init__(self, searchbar, productgrid, productlist, productname, productimage, producturl, productprice):
         self.searchbar = searchbar,
         self.productlist = productlist, 
         self.productname = productname, 
         self.productimage = productimage, 
         self.producturl = producturl, 
         self.productprice = productprice
    
    def convert_to_dict(self):
        search_page_dict = {
            "searchbar" = self.searchbar,
            "productlist" = self.productlist, 
            "productname" = self.productname, 
            "productimage" = self.productimage, 
            "producturl" = self.producturl, 
            "productprice" = self.productprice
        }

        return search_page_dict
    
    # Searchbar
    # product grid
    # product list
    # product name
    # product image
    # product url
    # product price


    # each should have
    #     id
    #     class
    #     tag
    #     xpath
    
# Currently this class is kept idle only the searching page class is being used
class Product_Page_Tags:
    def __init__(self, title, description, link, 
                imageslink, price, ratings, offers,):
    
        self.titletag = title
        self.descriptiontag = description
        self.linktag = link
        self.imageslinktag = imageslink
        self.pricetag = price
        self.ratingstag = ratings
        self.offerstag = offers
    
    
    # Convert to a dictionary
    def convert_to_dict(self):
        product_dict = {
            "title": self.titletag,
            "description": self.descriptiontag,
            "link": self.linktag,
            "imageslink": self.imageslinktag,
            "price": self.pricetag,
            "ratings": self.ratingstag,
            "offers": self.offerstag,
            "products_grid": self.products_grid,
            "products_list": self.products_list
        }

        return product_dict