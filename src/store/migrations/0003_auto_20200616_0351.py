# Generated by Django 3.0.7 on 2020-06-16 03:51

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('store', '0002_order_shipping_address'),
    ]

    operations = [
        migrations.RenameField(
            model_name='address',
            old_name='user',
            new_name='owner',
        ),
        migrations.RenameField(
            model_name='order',
            old_name='user',
            new_name='owner',
        ),
    ]