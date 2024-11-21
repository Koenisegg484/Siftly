from django.urls import path
from . import views

urlpatterns = [
    # Ecomm Stores Api
    path('', views.index),

    path('get-stores/', views.get_stores, name='get_stores'),
    path('web-scrapper/<str:search_query>/', views.web_scrapper, name='web_scrapper'),
    path('get-products/', views.get_products, name='get_products'),
    path('find-products/<str:search_string>/', views.search_products, name='find_products'),
]