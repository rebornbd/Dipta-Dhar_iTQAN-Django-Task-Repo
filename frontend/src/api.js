import Axios from "axios";
import { useHistory } from "react-router-dom";

import {
  getRefreshToken,
  setAccessToken,
  logout, 
  getAccessToken} from "./modules/shared/core/token";
import CONSTANT from "./constant";


const refreshAuth = async () => {
  try {
    const response = await Axios.post(
      `${CONSTANT.APP_BASE_URL}/user/signin/refresh-token`,
      { "refresh": `${getRefreshToken()}` }
    )
    .then(res => res?.data)
    .catch(err => { 
      throw new Error();
    })

    if (response && response["access"]) {
      setAccessToken(response["access"]);
      return true;
    }
    return false;
  } catch(err) {
    return false;
  }
};

const useApi = () => {
  const history = useHistory();

  const fail = () => {
    logout();
    history.push('/login');
  }

  const getAction = (httpVerb) => {
    //return a function and use that function later
    return (
      url,
      body = null,
      header = {},
    ) => {
      const effectiveHeader = {
        headers: {
          ...header,
          Authorization: `Bearer ${getAccessToken()}`,
        },
      };

      const CONFIG = {
        method: 'delete',
        url: url,
        headers: {
          'Authorization': `Bearer ${getAccessToken()}`
        }
      };

      switch(httpVerb){
        //these all return a promise, which can be awaited
        case "GET": 
          return Axios.get(url, effectiveHeader);
        case "POST": 
          return Axios.post(url, body, effectiveHeader);
        case "PATCH": 
          return Axios.patch(url, body,effectiveHeader);
        case "PUT": 
          return Axios.put(url, body, effectiveHeader);
        case "DELETE": 
            return Axios(CONFIG);
        default:
          return null;
      }
    }
  }

  const httpRequest = async (
    httpVerb,
    url,
    successCallback = ()=>{},
    failureCallback = ()=>{},
    body = null,
    header = {},
  ) => {
    const effectiveUrl = `${CONSTANT.APP_BASE_URL}/${url}`;

    try {
      const action = getAction(httpVerb);
      const response = await action (effectiveUrl, body, header);
      if(response.status >=200 && response.status<400) successCallback(response);
      else throw new Error();
    } catch(e) {
      try{
        if(!(await refreshAuth())) throw new Error();
        const action = getAction(httpVerb); 
        const response = await action (effectiveUrl, body, header)
        if(response.status >=200 && response.status<400) successCallback(response);
        else throw new Error();
      } catch (err) {
        const preventRedirectionToLogin = failureCallback(err);
        if(!preventRedirectionToLogin) fail();
      }
    }
  }


  const GET = async (
    url, 
    successCallback = ()=>{}, 
    failureCallback = ()=>{},
    header={}
  ) => {
    httpRequest("GET", url, successCallback, failureCallback, header);
  }

  const POST = async (
    url,
    body,
    successCallback,
    failureCallback,
    header = {}
  ) => {
    httpRequest("POST", url, successCallback, failureCallback, body, header);
  }

  const PATCH = async (
    url,
    body,
    successCallback,
    failureCallback,
    header = {}
  ) => {
    httpRequest("PATCH", url, successCallback, failureCallback, body, header);
  }

  const PUT = async (
    url,
    body,
    successCallback,
    failureCallback,
    header = {}
  ) => {
    httpRequest("PUT", url, successCallback, failureCallback, body, header);
  }

  const DELETE = async (
    url,
    successCallback,
    failureCallback,
    header = {}
  ) => {
    httpRequest("DELETE", url, successCallback, failureCallback, null, header);
  }

  return {GET, POST, PATCH, PUT, DELETE};
}

export default useApi;
