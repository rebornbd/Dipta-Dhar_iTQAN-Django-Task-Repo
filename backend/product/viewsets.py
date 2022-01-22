from rest_framework import viewsets
from rest_framework import filters
from rest_framework.permissions import IsAuthenticated
from .models import Category, Product
from .serializers import CategorySerializer, ProductSerializer, ProductListSerializer


class CategoryViewset(viewsets.ModelViewSet):
  permission_classes = (IsAuthenticated,)
  queryset = Category.objects.all()
  serializer_class = CategorySerializer
  filter_backends = [filters.SearchFilter]
  search_fields = ['name']


class ProductViewset(viewsets.ModelViewSet):
  http_method_names = ['post', 'put', 'delete', 'head']
  permission_classes = (IsAuthenticated,)
  queryset = Product.objects.all()
  serializer_class = ProductSerializer


class ProductListViewset(viewsets.ModelViewSet):
  http_method_names = ['get', 'head']
  permission_classes = (IsAuthenticated,)
  queryset = Product.objects.all()
  serializer_class = ProductListSerializer
  filter_backends = [filters.SearchFilter]
  # search_fields = ['name', 'short_desc', 'is_published', 'category__name', 'category__id']
  search_fields = ['category__id']


  def retrieve(self, request, *args, **kwargs):
    obj = self.get_object()
    obj.view_count = obj.view_count + 1
    obj.save()
    return super().retrieve(request, *args, **kwargs)
