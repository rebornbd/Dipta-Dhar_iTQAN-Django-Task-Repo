from django.urls import path, include
from . import routers


urlpatterns = [
  path('categories/', include(routers.categoryRouter.urls)),
  path('products/', include(routers.productRouter.urls)),
]
