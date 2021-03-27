from django.contrib import admin
from .models import Product, Diary, MealsIngredients, CaloricDemand

admin.site.register(Product)
admin.site.register(Diary)
admin.site.register(MealsIngredients)
admin.site.register(CaloricDemand)
