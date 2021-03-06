from django.db import models

class OrderItem(models.Model):
    name = models.CharField(max_length = 255, null = True)
    items = models.JSONField(null = True)
    total = models.DecimalField(max_digits = 10, decimal_places = 2, null = True)
    completed = models.BooleanField(default = False, null = False)

    def __str__(self):
        return f"{self.name} {self.items} {self.total} {self.completed}"

