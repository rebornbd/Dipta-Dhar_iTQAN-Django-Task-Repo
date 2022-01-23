### recruitment task

Frontend: [dipta-app-frontend.herokuapp.com](https://dipta-app-frontend.herokuapp.com/login) <br />
Backend: [dipta-app-backend.herokuapp.com](https://dipta-app-backend.herokuapp.com/)

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

#### frontend react
```
1) token based authentication
2) (general user dash-board)
   * login/signup
   * view product
   * view category
   * product details view
2) (admin user dash-board)
   * all general user funtionality
   * product list view (sorting by view-count)
   * crud category
```

### preview

##### general dashboard
![view1](https://i.ibb.co/V9MNcKW/Screenshot-from-2022-01-23-14-44-33.png)

##### admin dashboard
![view1](https://i.ibb.co/ggnHFJn/Screenshot-from-2022-01-23-14-40-55.png)

##### login
![view1](https://i.ibb.co/nwbNNym/Screenshot-from-2022-01-23-14-47-47.png)

##### signup
![view1](https://i.ibb.co/F6KFVfF/Screenshot-from-2022-01-23-14-48-18.png)
