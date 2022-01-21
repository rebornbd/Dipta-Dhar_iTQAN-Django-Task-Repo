### Goldlavender Recruitment Task

#### backend endpoint
```shell
# Authentication & Authorization
signup:           /user/signup                | POST
signin:           /user/signin                | POST
refresh-token:    /user/signin/refresh-token  | POST

# brand
list of brands:   /api/brands/                  | GET
details view:     /api/brands/:id/              | GET
create view:      /api/brands/                  | POST
update view:      /api/brands/:id/              | PUT
delete view:      /api/brands/:id/              | DELETE
search            /api/brands/?search=brandName | GET

# mobile (phone)
list of phones:   /api/phones/                        | GET
details view:     /api/phones/:id/                    | GET
create view:      /api/phones/phone/                  | POST
update view:      /api/phones/phone/:id/              | PUT
delete view:      /api/phones/phone/:id/              | DELETE
search            /api/phones/?search=modelORjancode  | GET
```

#### frontend react
```
1) build crud functionality
2) row custom design
```

#### preview
##### brands list
![view1](https://i.ibb.co/JHYqpXc/Screenshot-from-2021-12-27-23-45-09.png)

##### phones list
![view1](https://i.ibb.co/0yGJpJZ/Screenshot-from-2021-12-27-23-45-44.png)

##### phone update view
![view1](https://i.ibb.co/Gcp7Ch8/Screenshot-from-2021-12-27-23-45-59.png)
