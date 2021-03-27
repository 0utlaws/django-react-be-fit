from django.contrib.auth.models import User
from django.db import models


class Product(models.Model):
    name = models.CharField(max_length=256,)
    calories = models.IntegerField()
    protein = models.DecimalField(max_digits=4, decimal_places=1)
    carbohydrates = models.DecimalField(max_digits=4, decimal_places=1)
    fat = models.DecimalField(max_digits=4, decimal_places=1)


class Diary(models.Model):
    date = models.DateField()
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    class Meta:
        unique_together = ['date', 'user']


class MealsIngredients(models.Model):

    BREAKFAST = 1
    LUNCH = 2
    DINNER = 3
    SNACKS = 4

    MEALS = (
        (BREAKFAST, 'Breakfast'),
        (LUNCH, 'Lunch'),
        (DINNER, 'Dinner'),
        (SNACKS, 'Snacks')
    )

    diary = models.ForeignKey(Diary, on_delete=models.CASCADE)
    meal = models.IntegerField(choices=MEALS)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    amount = models.IntegerField()

    @property
    def product_name(self):
        return self.product.name

    @property
    def meal_name(self):
        return self.get_meal_display()

    @property
    def calories(self):
        return round(self.product.calories / 100 * self.amount, 1)

    @property
    def protein(self):
        return round(self.product.protein / 100 * self.amount, 1)

    @property
    def carbo(self):
        return round(self.product.carbohydrates / 100 * self.amount, 1)

    @property
    def fat(self):
        return round(self.product.fat / 100 * self.amount, 1)


class CaloricDemand(models.Model):
    calories = models.IntegerField(default=1800)
    protein = models.IntegerField(default=135)
    carbohydrates = models.IntegerField(default=225)
    fat = models.IntegerField(default=40)
    user = models.OneToOneField(User, on_delete=models.CASCADE)