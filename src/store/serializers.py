from rest_framework import serializers
from store.models import Product, CartItem, Order, OrderItem, Address, Review, Image


class ProductSerializer(serializers.ModelSerializer):

    class Meta:
        model = Product
        fields = ['id', 'name', 'price', 'short_description',
                  'long_description', 'rating']


class ImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Image
        fields = ['id', 'path']


class CreateImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Image
        fields = ['product', 'path']


class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = ['id', 'product', 'time', 'rating', 'title', 'review']


class CreateCartItemSerializer(serializers.ModelSerializer):

    class Meta:
        model = CartItem
        fields = ['product', 'count']


class CartItemSerializer(serializers.ModelSerializer):
    product = ProductSerializer()

    class Meta:
        model = CartItem
        fields = ['id', 'product', 'count']


class OrderItemSerializer(serializers.ModelSerializer):
    item = ProductSerializer()

    class Meta:
        model = OrderItem
        fields = ['item', 'count']


class OrderSerializer(serializers.ModelSerializer):
    order_items = OrderItemSerializer(many=True)
    shipping_address = serializers.StringRelatedField()

    class Meta:
        model = Order
        fields = ['id', 'time', 'order_items', 'shipping_address', 'total_price']


class AddressSerializer(serializers.ModelSerializer):

    class Meta:
        model = Address
        fields = ['id', 'street_number', 'street_name', 'city', 'state', 'zipcode']


class CreateAddressSerializer(serializers.ModelSerializer):

    class Meta:
        model = Address
        fields = ['street_number', 'street_name', 'city', 'state', 'zipcode']
