# Generated by Django 3.0.7 on 2020-07-12 03:58

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('store', '0012_auto_20200712_0324'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='product',
            name='tag',
        ),
        migrations.AddField(
            model_name='tag',
            name='product',
            field=models.ManyToManyField(related_name='tag', to='store.Product'),
        ),
    ]
