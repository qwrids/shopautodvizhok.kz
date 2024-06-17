import os
from django.db import models
from django.contrib.auth.models import User
from uuid import uuid4

def background_path(instance, filename):
    upload_to = 'images'
    ext = filename.split('.')[-1]

    if instance.pk:
        filename = '{}.{}'.format(instance.pk, ext)
    else:
        filename = '{}.{}'.format(uuid4().hex, ext)
    
    return os.path.join(upload_to, filename)

class GoodModel(models.Model):
    name = models.CharField(max_length=128)
    price = models.IntegerField()
    count = models.IntegerField()
    image = models.ImageField(upload_to=background_path, blank=True)
    def __str__(self) -> str:
        return self.name


class CartModel(models.Model):
    good_id = models.ForeignKey(GoodModel, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    count = models.IntegerField()
    overall_price = models.IntegerField(default=0, null=True)
    def save(self, *args, **kwargs):
        self.overall_price = self.count * self.good_id.price
        super().save(*args, **kwargs)
    def __str__(self) -> str:
        return self.good_id.name

class OrderModel(models.Model):
    good_id = models.ForeignKey(GoodModel, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    first_name = models.CharField(max_length=128)
    last_name = models.CharField(max_length=128)
    city = models.CharField(max_length=256)
    address = models.CharField(max_length=256)
    count = models.IntegerField()
    payment_method = models.CharField(max_length=128)
    overall_price = models.IntegerField(default=0, null=True)
    phone = models.CharField(max_length=20, null=True)
    def __str__(self):
        return f"{self.user.last_name} {self.user.last_name} заказал товар."
    def save(self, *args, **kwargs):
        
        self.overall_price = self.count * self.good_id.price
        super().save(*args, **kwargs)
