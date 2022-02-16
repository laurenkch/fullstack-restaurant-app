# Generated by Django 4.0.2 on 2022-02-16 01:50

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('orders', '0002_remove_orderitem_order'),
    ]

    operations = [
        migrations.AddField(
            model_name='orderitem',
            name='items',
            field=models.JSONField(null=True),
        ),
        migrations.AddField(
            model_name='orderitem',
            name='ordername',
            field=models.CharField(max_length=255, null=True),
        ),
        migrations.AddField(
            model_name='orderitem',
            name='total',
            field=models.DecimalField(decimal_places=2, max_digits=10, null=True),
        ),
    ]
