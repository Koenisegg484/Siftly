import nltk
import pandas as pd
import re
from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize
from nltk.stem import PorterStemmer
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

# # Ensure you have the necessary NLTK data files
# nltk.download('punkt')
# nltk.download('stopwords')

ps = PorterStemmer()

def normalize(text): 
    text = text.lower()
    text = re.sub(r'[^\w\s.]', ' ', text)
    text = re.sub(r'\s+', ' ', text)
    return text.strip()

def preprocessing_text(text):
    text = normalize(text)
    tokens = word_tokenize(text)
    tokens = [word for word in tokens if word not in stopwords.words('english')]
    tokens = [ps.stem(word) for word in tokens]
    custom_stopwords = set(['inch', 'home', 'windows', 'ssd', 'display', '11', 'kg',])
    tokens = [word for word in tokens if word not in custom_stopwords]
    print(tokens)
    return ' '.join(tokens)

data = pd.DataFrame({
    'title': [
        'Acer Nitro V Gaming Laptop 13th Gen Intel Core i5-13420H with RTX 3050 Graphics 6 GB VRAM, 144Hz Display (16 GB DDR5/512GB SSD/Windows 11 Home/Wi-Fi 6),15.6"(39.6cms) FHD ANV15-51',
        'Acer Nitro V Intel Core i5 13th Gen 13420H - (16 GB/512 GB SSD/Windows 11 Home/6 GB Graphics/NVIDIA GeForce RTX 3050) ANV15-51 Gaming Laptop  (15.6 Inch, Shale Black, 2.1 kg)'
    ]
})

data['processed_title'] = data['title'].apply(preprocessing_text)

vectorizer = TfidfVectorizer()
tfid_matrix = vectorizer.fit_transform(data['processed_title'])

cosine_sim = cosine_similarity(tfid_matrix, tfid_matrix)

print("Printing cosine similarity\n")
print(cosine_sim)
