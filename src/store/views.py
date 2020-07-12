from django.shortcuts import render
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from store.models import Product, CartItem, Order, OrderItem, Address, Review,  Image
from store.serializers import ProductSerializer, CartItemSerializer, CreateCartItemSerializer, AddressSerializer, CreateAddressSerializer, OrderSerializer, ReviewSerializer, ImageSerializer, CreateImageSerializer


@api_view(['GET'])
@permission_classes([AllowAny])
def list_products(request):
    products = Product.objects.all()
    serializer = ProductSerializer(products, many=True)
    return Response(serializer.data)


@api_view(['POST'])
@permission_classes([AllowAny])  # to remove
def create_product(request):
    serializer = ProductSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(data=serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# delete a product
@api_view(['DELETE'])
@permission_classes([AllowAny])  # to remove
def delete_product(request):
    try:
        product = Product.objects.get(id=request.data["id"])
    except Product.DoesNotExist:
        return Response({"info": "product not found"}, status=status.HTTP_404_NOT_FOUND)

    product.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)


# get detailed information of a product
@api_view(['GET'])
@permission_classes([AllowAny])
def product_detail(request, pk):
    try:
        product = Product.objects.get(pk=pk)
    except Product.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    serializer = ProductSerializer(item)
    return Response(serializer.data)


# browse items in cart
@api_view(['GET'])
def view_cart(request):
    try:
        items = CartItem.objects.filter(owner=request.user)
    except CartItem.DoesNotExist:
        items = []
    serializer = CartItemSerializer(items, many=True)
    return Response(data=serializer.data, status=status.HTTP_200_OK)


# add item to cart
@api_view(['POST'])
def add_item(request):
    serializer = CreateCartItemSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save(owner=request.user)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(data=serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# get information of a cart items
@api_view(['GET'])
def cart_item_detail(request, pk):
    try:
        item = CartItem.objects.get(pk=pk)
        # check if this item belongs to the current user
        if item.owner != request.user:
            return Response(status=status.HTTP_403_FORBIDDEN)
    except CartItem.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    serializer = CartItemSerializer(item)
    return Response(serializer.data)


# update or delete a cart item
@api_view(['PUT', 'DELETE'])
def cart_item(request):
    try:
        item = CartItem.objects.get(id=request.data["id"])
    except CartItem.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    # check if this item belongs to the current user
    if item.owner != request.user:
        return Response(status=status.HTTP_403_FORBIDDEN)

    if request.method == 'PUT':
        serializer = CartItemSerializer(item, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(data=serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        item.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


# turns all cart items into an order
@api_view(['POST'])
def create_order(request):
    try:
        address_id = request.data["address"]
        address = Address.objects.get(id=address_id)
    except Address.DoesNotExist:
        return Response({"error": "Address not found"}, status=status.HTTP_404_NOT_FOUND)

    if address.owner != request.user:
        return Response(status=status.HTTP_403_FORBIDDEN)

    # try:
    #     # calculate the total price of all cart items
    #     cart_items = CartItem.objects.filter(owner=request.user)
    #     amount = 0.0
    #     for item in cart_items:
    #         price = item.product.price
    #         amount += price * item.count
    #
    #     order = Order.create(owner=request.user, shipping_address=address, total_price=amount)
    #
    #     order = order.save()
    # except:
    #     return Response(status=status.HTTP_400_BAD_REQUEST)

    # calculate the total price of all cart items
    cart_items = CartItem.objects.filter(owner=request.user)
    amount = 0.0
    for item in cart_items:
        price = item.product.price
        amount += price * item.count

    order = Order(owner=request.user, shipping_address=address, total_price=amount)

    order.save()

    # create individual order items
    for item in cart_items:
        order_item = OrderItem(item=item.product, count=item.count, order=order)
        order_item.save()

    # delete all cart items for the user
    for item in cart_items:
        item.delete()

    return Response(status=status.HTTP_201_CREATED)


# create a new address
@api_view(['POST'])
def create_address(request):
    serializer = CreateAddressSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save(owner=request.user)
        return Response(status=status.HTTP_201_CREATED)
    return Response(data=serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# update or delete an address
@api_view(['PUT', 'DELETE'])
def address(request):

    try:
        address = Address.objects.get(id=request.data['id'])
    except Address.DoesNotExist:
        return Response({"info": "Address not found"}, status=status.HTTP_404_NOT_FOUND)

    if request.method == 'PUT':
        serializer = AddressSerializer(address, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_200_OK)
        return Response(data=serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        address.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


# list all address of the user
@api_view(['GET'])
def list_addresses(request):
    addresses = Address.objects.filter(owner=request.user)
    serializer = AddressSerializer(addresses, many=True)
    return Response(serializer.data)


# list all the orders placed by the user
@api_view(['GET'])
def list_orders(request):
    orders = Order.objects.filter(owner=request.user)
    serializer = OrderSerializer(orders, many=True)
    return Response(data=serializer.data, status=status.HTTP_200_OK)


# list all the reviews of the product
@api_view(['POST'])
@permission_classes([AllowAny])
def list_reviews(request):
    try:
        product = Product.objects.get(id=request.data['id'])
    except Product.DoesNotExist:
        return Response({"info": "product not found"}, status=status.HTTP_404_NOT_FOUND)
    reviews = Reviews.objects.filter(product=product)
    serializer = ReviewSerializer(reviews, many=True)
    return Response(serializer.data)


# create a new review
@api_view(['POST'])
def add_review(request):
    serializer = ReviewSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save(author=request.user, name=request.user.username)
        return Response(status=status.HTTP_201_CREATED)
    return Response(data=serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# update or delete a review
@api_view(['PUT', 'DELETE'])
def review(request):

    try:
        review = Review.objects.get(id=request.data['id'])
    except Review.DoesNotExist:
        return Response({"info": "Review not found"}, status=status.HTTP_404_NOT_FOUND)

    if review.author != request.user:
        return Response(status=status.HTTP_403_FORBIDDEN)

    if request.method == 'PUT':
        serializer = ReviewSerializer(review, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_200_OK)
        return Response(data=serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        review.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


# create a new image
@api_view(['POST'])
@permission_classes([AllowAny])  # to remove
def create_image(request):
    serializer = CreateImageSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(status=status.HTTP_201_CREATED)
    return Response(data=serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# delete an image
@api_view(['DELETE'])
@permission_classes([AllowAny])  # to remove
def delete_image(request):

    try:
        image = Image.objects.get(id=request.data['id'])
    except Image.DoesNotExist:
        return Response({"info": "image not found"}, status=status.HTTP_404_NOT_FOUND)

    if request.method == 'DELETE':
        image.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
    else:
        return Response(status=status.HTTP_405_METHOD_NOT_ALLOWED)


# list all images
@api_view(['GET'])
@permission_classes([AllowAny])
def all_images(request):
    images = Image.objects.all()
    serializer = ImageSerializer(images, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)
