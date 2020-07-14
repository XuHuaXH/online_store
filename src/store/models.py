from django.db import models
from django.contrib.auth.models import User
import os
from django.conf import settings


class Product(models.Model):
    name = models.CharField(max_length=30)
    price = models.FloatField()
    short_description = models.TextField()
    long_description = models.TextField(default="long product description")
    # rating = models.DecimalField(max_digits=10, decimal_places=1, default=5)

    def __str__(self):
        return "%s %f\n%s" % (self.name, self.price, self.description)


class Image(models.Model):
    path = models.CharField(max_length=50)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)

    def __str__(self):
        return str(self.path)


class Review(models.Model):
    name = models.CharField(max_length=50)
    time = models.CharField(max_length=50)
    rating = models.SmallIntegerField()
    title = models.TextField()
    review = models.TextField()
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)


class CartItem(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    count = models.SmallIntegerField()
    owner = models.ForeignKey(User, on_delete=models.CASCADE)


class Address(models.Model):
    street_number = models.SmallIntegerField()
    street_name = models.CharField(max_length=50)
    city = models.CharField(max_length=30)
    state = models.CharField(max_length=10)
    zipcode = models.CharField(max_length=6)
    owner = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):
        return '%s %s, %s, %s %s' % (self.street_number, self.street_name, self.city, self.state, self.zipcode)


class Order(models.Model):
    time = models.DateTimeField(auto_now=True)
    total_price = models.FloatField()
    owner = models.ForeignKey(User, on_delete=models.CASCADE)
    shipping_address = models.ForeignKey(Address, on_delete=models.DO_NOTHING, default='')


class OrderItem(models.Model):
    item = models.ForeignKey(Product, on_delete=models.DO_NOTHING)
    count = models.SmallIntegerField()
    order = models.ForeignKey(Order, related_name='order_items', on_delete=models.CASCADE)
