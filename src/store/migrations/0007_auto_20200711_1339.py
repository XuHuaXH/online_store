# Generated by Django 3.0.7 on 2020-07-11 13:39

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('store', '0006_auto_20200711_1323'),
    ]

    operations = [
        migrations.AlterField(
            model_name='image',
            name='image',
            field=models.FilePathField(path='./images/'),
        ),
    ]
