# Generated by Django 3.0.7 on 2020-07-12 02:54

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('store', '0009_auto_20200711_1456'),
    ]

    operations = [
        migrations.AlterField(
            model_name='image',
            name='path',
            field=models.FilePathField(path='/Users/xuhua/Desktop/online_store/src/store/images/'),
        ),
    ]
