from django.urls import path, include
from store import views

urlpatterns = [
    path('list-products/', views.list_products),
    path('create-product/', views.create_product),
    path('delete-product/', views.delete_product),
    path('product/', views.product_detail),
    path('view-cart/', views.view_cart),
    path('add-item/', views.add_item),
    path('cart-item-detail/<int:pk>/', views.cart_item_detail),
    path('cart-item/', views.cart_item),
    path('create-order/', views.create_order),
    path('create-address/', views.create_address),
    path('address/', views.address),
    path('list-addresses/', views.list_addresses),
    path('list-orders/', views.list_orders),
    path('create-image/', views.create_image),
    path('delete-image/', views.delete_image),
    path('all-images/', views.all_images),
    path('list-images/', views.list_images),
    path('list-reviews/', views.list_reviews),
    path('add-review/', views.add_review),
    path('review/', views.review)
]
