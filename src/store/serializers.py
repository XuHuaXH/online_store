from rest_framework import serializers
from store.models import Product, CartItem, Order, Address


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


class OrderSerializer(serializers.ModelSerializer):

    class Meta:
        model = Order
        fields = ['address']


class AddressSerializer(serializers.ModelSerializer):

    class Meta:
        model = Address
        fields = ['id', 'street_number', 'street_name', 'city', 'state', 'zipcode']


class CreateAddressSerializer(serializers.ModelSerializer):

    class Meta:
        model = Address
        fields = ['street_number', 'street_name', 'city', 'state', 'zipcode']
