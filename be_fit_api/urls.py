from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from . import views

router = routers.DefaultRouter()
router.register('products', views.ProductViewSet, basename="products")

urlpatterns = [
    path('', include(router.urls)),
    path('caloric_demand/', views.CaloricDemandView.as_view()),
    path('diarys/', views.DiaryList.as_view()),
    path('diary/<int:pk>/', views.DiaryView.as_view()),
    path('meals_ingredients/', views.MealsIngredientsList.as_view()),
    path('meal_ingredient/<int:pk>/', views.MealsIngredientsView.as_view())
]