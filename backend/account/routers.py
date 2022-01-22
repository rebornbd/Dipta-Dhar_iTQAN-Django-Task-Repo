from rest_framework import routers
from .viewsets import UserViewSet


userRouter = routers.SimpleRouter()
userRouter.register(r'', UserViewSet)
