from django.urls import path, include
from store import views


urlpatterns = [
    path('list-products/', views.list_products),
    path('create-product/', views.create_product),
    path('view-cart/', views.view_cart),
    path('add-item/', views.add_item),
    path('cart-item-detail/<int:pk>/', views.cart_item_detail),
    path('cart-item/', views.cart_item),
]
