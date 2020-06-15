from rest_framework import serializers
from store.models import Product, CartItem


class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ['id', 'name', 'price', 'description']


class CreateCartItemSerializer(serializers.ModelSerializer):

    class Meta:
        model = CartItem
        fields = ['product', 'count']


class CartItemSerializer(serializers.ModelSerializer):

    class Meta:
        model = CartItem
        fields = ['id', 'product', 'count']
