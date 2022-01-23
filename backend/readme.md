#### backend endpoint
```shell
# Authentication & Authorization
signup:           /user/signup                | POST
signin:           /user/signin                | POST
refresh-token:    /user/signin/refresh-token  | POST

# category
list of category: /api/categories/                      | GET
details view:     /api/categories/:id/                  | GET
create view:      /api/categories/                      | POST
update view:      /api/categories/:id/                  | PUT
delete view:      /api/categories/:id/                  | DELETE
search            /api/categories/?search=categoryName  | GET

# product
list of product:  /api/products/                      | GET
details view:     /api/products/:id/                  | GET
create view:      /api/products/product/              | POST
update view:      /api/products/product/:id/          | PUT
delete view:      /api/products/product/:id/          | DELETE
search            /api/products/?search=categoryId    | GET
```
