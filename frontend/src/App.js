import { Route, Switch, Redirect } from "react-router-dom";
import React from "react";

import { LoginPage } from "./modules/auth/login";
import { SignupPage } from "./modules/auth/signup";
import { HomePage } from "./modules/home";
import { CategoryPage } from "./modules/category";
import CreateCategory from "./modules/category/components/createCategory";
import UpdateCategory from "./modules/category/components/updateCategory";

import { Productdisplay } from "./modules/home/components/product/productDisplay";
import { ProductListdisplay } from "./modules/home/components/product/productListDisplay";

import { AdminPage } from "./modules/admin";

import { PhonePage } from "./modules/phone";
import CreatePhone from "./modules/phone/components/createPhone";
import UpdatePhone from "./modules/phone/components/updatePhone";

import UnauthRoute from "./unauthRoute";
import PrivateRoute from "./privateRoute";
import ProtectedRoute from "./protectedRoute";

import { Header } from "./modules/shared/header";
import { Footer } from "./modules/shared/footer";


export default function App() {
  return (<>
    {/* <Header /> */}
    <Switch>
      <Route exact path="/" render={() => <Redirect to="landing" />} />
      <Route path="/signup" component={ SignupPage } />
      <Route path="/login" component={ LoginPage } />

      <PrivateRoute
        path="/category/create"
        component={()=><CreateCategory />}/>
      
      <PrivateRoute
        path="/category/:categoryId"
        component={()=><UpdateCategory />}/>
      
      <PrivateRoute
        path="/category"
        component={()=><CategoryPage />}/>

      <PrivateRoute
        path="/product-category/:categoryId"
        component={()=><ProductListdisplay />}/>

      <PrivateRoute
        path="/product/:productId"
        component={()=><Productdisplay />}/>

      {/* <PrivateRoute
        path=""
        component={()=><CreatePhone />}/>
      <Route path="/phone/create" component={ CreatePhone } />
      <Route path="/phone/:phoneId" component={ UpdatePhone } />
      <Route path="/phone" component={ PhonePage } /> */}

      <PrivateRoute
        path="/landing"
        component={() => <HomePage />}
      />

      <ProtectedRoute 
        path="/admin"
        component={() => <AdminPage />}
      />
    </Switch>
    {/* <Footer /> */}
  </>);
}
