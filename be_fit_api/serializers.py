from rest_framework import serializers
from .models import Product, Diary, MealsIngredients, CaloricDemand

class CaloricDemandSerializer(serializers.ModelSerializer):
    class Meta:
        model = CaloricDemand
        fields = ['id', 'calories', 'protein', 'carbohydrates', 'fat']


class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ['id', 'name', 'calories', 'protein', 'carbohydrates', 'fat']


class DiarySerializer(serializers.ModelSerializer):
    class Meta:
        model = Diary
        fields = ['id', 'date']


class MealIngredientProductSerializer(serializers.ModelSerializer):
    product = ProductSerializer()
    class Meta:
        model = MealsIngredients
        fields = ['id', 'diary', 'meal', 'product', 'amount']

    def create(self, validated_data):
        product_data = validated_data.pop('product')
        product = Product.objects.create(**product_data)
        mealI = MealsIngredients.objects.create(product=product, **validated_data)
        return mealI


class MealsIngredientsSerializer(serializers.ModelSerializer):
    class Meta:
        model = MealsIngredients
        fields = ['id', 'diary', 'meal', 'product', 'amount']


class MealsIngredientsDiarySerializer(serializers.ModelSerializer):
    class Meta:
        model = MealsIngredients
        fields = ['id', 'meal_name', 'product_name', 'calories', 'protein', 'carbo', 'fat']

    


        

