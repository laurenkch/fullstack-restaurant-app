# Generated by Django 4.0.2 on 2022-02-16 18:15

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('orders', '0004_orderitem_completed'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='orderitem',
            name='ordername',
        ),
    ]
