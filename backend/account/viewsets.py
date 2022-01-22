from rest_framework import viewsets
from rest_framework import filters
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth.models import User
from .serializers import UserSerializer


class UserViewSet(viewsets.ModelViewSet):
  http_method_names = ['get', 'head']
  permission_classes = (IsAuthenticated,)
  queryset = User.objects.all()
  serializer_class = UserSerializer

  def get_object(self):
    return self.request.user

  def list(self, request, *args, **kwargs):
    return self.retrieve(request, *args, **kwargs)
