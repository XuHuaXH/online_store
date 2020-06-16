from django.shortcuts import render
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from store.models import Product, CartItem
from store.serializers import ProductSerializer, CartItemSerializer, CreateCartItemSerializer


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
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# browse items in cart
@api_view(['GET'])
def view_cart(request):
    try:
        items = CartItem.objects.filter(owner=request.user)
    except CartItem.DoesNotExist:
        items = []
    serializer = CartItemSerializer(items, many=True)
    return Response(serializer.data, status=status.HTTP_200_OK)


# add item to cart
@api_view(['POST'])
def add_item(request):
    serializer = CreateCartItemSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save(owner=request.user)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


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
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        item.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
