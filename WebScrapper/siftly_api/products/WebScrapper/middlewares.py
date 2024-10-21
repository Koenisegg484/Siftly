
def ratings(rating):
    return rating[:3]


def format_price(price_str):
    # Remove any non-digit characters
    formatted_price = ''.join(filter(str.isdigit, price_str))
    return formatted_price

def format_ratings(ratings_str):
    # Extract the first number (ratings count) from the string
    formatted_ratings = ''.join(filter(str.isdigit, ratings_str.split()[0]))
    return formatted_ratings
