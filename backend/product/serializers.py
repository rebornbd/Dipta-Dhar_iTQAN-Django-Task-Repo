from rest_framework import serializers
from .models import Category, Product


class CategorySerializer(serializers.ModelSerializer):
  class Meta:
    model = Category
    fields = '__all__'
    depth = 0

class ProductSerializer(serializers.ModelSerializer):
  class Meta:
    model = Product
    fields = '__all__'
    depth = 0

class ProductListSerializer(serializers.ModelSerializer):
  class Meta:
    model = Product
    fields = '__all__'
    depth = 1
