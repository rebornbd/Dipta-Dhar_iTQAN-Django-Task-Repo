import { Route, Redirect } from "react-router-dom";
import React from "react";
import { getRefreshToken } from "./modules/shared/core/token";


const PrivateRoute = ({ component, ...rest }) => {
  return (getRefreshToken())
	? <Route {...rest} render={component} />
	: <Redirect to="/login" />
};

export default PrivateRoute;
