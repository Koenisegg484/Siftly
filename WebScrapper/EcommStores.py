class ECommerceStore:
    def __init__(self, name, homepage, logo, niche, offers, producttags):
        self.name = name
        self.homepage = homepage
        self.logo = logo
        self.niche = niche #This is a list
        self.offers = offers 
        self.producttags = producttags
        
    def convert_to_dict(self):
        # Convert to a dictionary
        store_dict = {
            "name": self.name,
            "homepage": self.homepage,
            "logo": self.logo,
            "niche": self.niche,
            "offers": self.offers,
            "producttags": self.producttags
        }
        
        return store_dict