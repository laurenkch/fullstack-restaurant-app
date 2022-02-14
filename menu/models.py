from django.db import models

class MenuItem(models.Model):
    name = models.CharField(max_length= 255)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    description = models.CharField(max_length = 255)
    catergory = models.CharField(max_length = 255)
    quantity = models.IntegerField()

    def __str__(self):
        return (self.name)