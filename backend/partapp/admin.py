from django.contrib import admin
from .models import *

@admin.register(GoodModel)
class GoodAdmin(admin.ModelAdmin):
    search_fields = ('name',)

@admin.register(OrderModel)
class OrderAdmin(admin.ModelAdmin):
    search_fields = ('name',)

@admin.register(CartModel)
class CartAdmin(admin.ModelAdmin):
    search_fields = ('name',)
