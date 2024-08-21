class Product_tags:
    def __init__(self, title, description, link, storename, imageslink, price, size, ratings, offers):
        self.titletag = title
        self.descriptiontag = description
        self.linktag = link
        self.ecommerceStoretag = storename
        self.imageslinktag = imageslink
        self.pricetag = price
        self.sizetag = size
        self.ratingstag = ratings
        self.offerstag = offers
    
    
    # Convert to a dictionary
    def convert_to_dict(self):
        product_dict = {
            "title": self.titletag,
            "description": self.descriptiontag,
            "link": self.linktag,
            "storename": self.ecommerceStoretag,
            "imageslink": self.imageslinktag,
            "price": self.pricetag,
            "size": self.sizetag,
            "ratings": self.ratingstag,
            "offers": self.offerstag
        }

        return product_dict