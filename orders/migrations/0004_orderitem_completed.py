# Generated by Django 4.0.2 on 2022-02-16 17:35

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('orders', '0003_orderitem_items_orderitem_ordername_orderitem_total'),
    ]

    operations = [
        migrations.AddField(
            model_name='orderitem',
            name='completed',
            field=models.BooleanField(default=False),
            preserve_default=False,
        ),
    ]
