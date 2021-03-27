from .models import Product, Diary, MealsIngredients, CaloricDemand
from .serializers import (
    ProductSerializer,
    DiarySerializer,
    MealsIngredientsDiarySerializer,
    MealsIngredientsSerializer,
    MealIngredientProductSerializer,
    CaloricDemandSerializer
)
from django.http import Http404
from rest_framework import viewsets, status
from rest_framework.views import APIView
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated


class CaloricDemandView(APIView):
    authentication_classes = (TokenAuthentication, )
    permission_classes = (IsAuthenticated, )

    def get_object(self):
        try:
            return CaloricDemand.objects.get(user=self.request.user)
        except CaloricDemand.DoesNotExist:
            raise Http404

    def get(self, request):
        cd = self.get_object()
        serializer = CaloricDemandSerializer(cd, many=False)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def put(self, request):
        cd = self.get_object()
        serializer = CaloricDemandSerializer(cd, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    authentication_classes = (TokenAuthentication, )
    permission_classes = (IsAuthenticated, )

    @action(detail=False, methods=['POST'])
    def product_in_meal(self, request):
        serializer = MealIngredientProductSerializer(data=request.data)
        if serializer.is_valid():
            mealI = serializer.save()
            response = MealsIngredientsDiarySerializer(mealI, many=False)
            return Response(response.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class DiaryList(APIView):
    authentication_classes = (TokenAuthentication, )
    permission_classes = (IsAuthenticated, )

    def get(self, request):
        qs = Diary.objects.filter(user=self.request.user)
        serializer = DiarySerializer(qs, many=True)
        return Response(serializer.data)

    def post(self, request):
        print(request.data)
        serializer = DiarySerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class DiaryView(APIView):
    authentication_classes = (TokenAuthentication, )
    permission_classes = (IsAuthenticated, )

    def get_object(self, pk):
        try:
            return Diary.objects.get(pk=pk)
        except Diary.DoesNotExist:
            raise Http404

    def get(self, request, pk):
        diary = self.get_object(pk)
        mealsI = MealsIngredients.objects.filter(diary=diary)
        serializer = MealsIngredientsDiarySerializer(mealsI, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def delete(self, request, pk):
        diary = self.get_object(pk)
        diary.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class MealsIngredientsList(APIView):
    authentication_classes = (TokenAuthentication, )
    permission_classes = (IsAuthenticated, )

    def post(self, request):
        serializer = MealsIngredientsSerializer(data=request.data)
        if serializer.is_valid():
            mealI = serializer.save()
            response = MealsIngredientsDiarySerializer(mealI, many=False)
            return Response(response.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class MealsIngredientsView(APIView):
    authentication_classes = (TokenAuthentication, )
    permission_classes = (IsAuthenticated, )

    def get_object(self, pk):
        try:
            return MealsIngredients.objects.get(pk=pk)
        except MealsIngredients.DoesNotExist:
            raise Http404

    def get(self, request, pk):
        mealI = self.get_object(pk)
        serializer = MealsIngredientsSerializer(mealI)
        return Response(serializer.data)

    def put(self, request, pk):
        mealI = self.get_object(pk)
        serializer = MealsIngredientsSerializer(mealI, data=request.data)
        if serializer.is_valid():
            mealI = serializer.save()
            response = MealsIngredientsDiarySerializer(mealI, many=False)
            return Response(response.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        mealI = self.get_object(pk)
        mealI.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

        


