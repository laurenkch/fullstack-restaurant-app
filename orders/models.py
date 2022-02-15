from django.db import models

class OrderItem(models.Model):
    order = models.TextField()

    def __str__(self):
        return self.order
