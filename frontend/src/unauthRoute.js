import { Route, Redirect } from "react-router-dom";
import React from "react";
import { getRefreshToken } from "./modules/shared/core/token";


const UnauthRoute = ({ component, ...rest }) => {
  return (getRefreshToken())
  ? <Redirect to="/category" />
  : <Route {...rest} render={component} />
};

export default UnauthRoute;
