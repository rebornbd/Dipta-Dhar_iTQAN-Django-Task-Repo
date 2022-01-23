import { Route, Redirect } from "react-router-dom";
import React, { useState, useEffect } from "react";
import Loading, { HFLoading } from "./modules/shared/loading";
import useApi from "./api";
import { setUserData as setUserDataLocalStorage } from "./modules/shared/core/token";


const ProtectedRoute = ({ component, ...rest }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const { GET } = useApi();

  useEffect(() => {
    const preLoad = async () => {
      await GET(
        "user/details/",
        (res) => {
          // console.log(res?.data);

          setUser(res?.data);
          setUserDataLocalStorage(JSON.stringify(res?.data));
          setLoading(false);
        },
        (err) => {
          console.log(err);
          setLoading(false);
        }
      );
    };
    preLoad();
  }, []);


  return (loading)
  ? <HFLoading />
  : (user && user?.is_superuser)
	  ? <Route {...rest} render={component} />
	  : <Redirect to="/other" />
};

export default ProtectedRoute;
