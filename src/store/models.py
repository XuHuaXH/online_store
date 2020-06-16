from django.db import models
from django.contrib.auth.models import User


class Product(models.Model):
    name = models.CharField(max_length=30)
    price = models.FloatField()
    description = models.TextField()

    def __str__(self):
        return "%s %f\n%s" % (self.name, self.price, self.description)


# class Cart(model.Model):
#     user = models.OneToOneField(User, on_delete=models.CASCADE, primary_key=True)
#

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


class Order(models.Model):
    time = models.DateTimeField(auto_now=True)
    total_price = models.FloatField()
    owner = models.ForeignKey(User, on_delete=models.CASCADE)
    shipping_address = models.ForeignKey(Address, on_delete=models.DO_NOTHING, default='')


class OrderItem(models.Model):
    item = models.ForeignKey(Product, on_delete=models.CASCADE)
    count = models.SmallIntegerField()
    order = models.ForeignKey(Order, on_delete=models.CASCADE)
