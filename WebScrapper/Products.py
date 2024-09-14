class Product_tags:
    def __init__(self, searchbar, title, description, link, storename, imageslink, price, size, ratings, offers, products_grid, products_list):
        self.searchbar = searchbar
        self.titletag = title
        self.descriptiontag = description
        self.linktag = link
        self.ecommerceStoretag = storename
        self.imageslinktag = imageslink
        self.pricetag = price
        self.sizetag = size
        self.ratingstag = ratings
        self.offerstag = offers
        self.products_grid = products_grid
        self.products_list = products_list
    
    
    # Convert to a dictionary
    def convert_to_dict(self):
        product_dict = {
            "searchbar": self.searchbar,
            "title": self.titletag,
            "description": self.descriptiontag,
            "link": self.linktag,
            "storename": self.ecommerceStoretag,
            "imageslink": self.imageslinktag,
            "price": self.pricetag,
            "size": self.sizetag,
            "ratings": self.ratingstag,
            "offers": self.offerstag,
            "products_grid": self.products_grid,
            "products_list": self.products_list
        }

        return product_dict