class ECommerceStore:
    def __init__(self, name, homepage, logo, niche, offers, searching_page_tags):
        self.name = name
        self.homepage = homepage
        self.logo = logo
        self.niche = niche #This is a list
        self.offers = offers 
        self.searching_page_tags = searching_page_tags
        
    def convert_to_dict(self):
        # Convert to a dictionary
        store_dict = {
            "name": self.name,
            "homepage": self.homepage,
            "logo": self.logo,
            "niche": self.niche,
            "offers": self.offers,
            "searching_page_tags" : self.searching_page_tags
        }
        
        return store_dict