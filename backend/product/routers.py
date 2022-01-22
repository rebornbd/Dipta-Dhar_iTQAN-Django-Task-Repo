from rest_framework import routers
from .viewsets import CategoryViewset, ProductViewset, ProductListViewset


categoryRouter = routers.SimpleRouter()
categoryRouter.register(r'', CategoryViewset)

productRouter = routers.SimpleRouter()
productRouter.register(r'product', ProductViewset)
productRouter.register(r'', ProductListViewset)
