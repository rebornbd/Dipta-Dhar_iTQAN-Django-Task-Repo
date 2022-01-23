import CONSTANT from '../../../constant';
import { getAccessToken } from './token';


const makeConfig = (method='get', url, data='', token='') => {
  const myData = JSON.stringify(data);
  
  return (token === '')
  ? {
    method: method,
    url: `${CONSTANT.APP_BASE_URL}/${url}`,
    headers: {
      'Content-Type': 'application/json'
    },
    data : myData
  }
  : {
    method: method,
    url: `${CONSTANT.APP_BASE_URL}/${url}`,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    data : myData
  };
}

export const axiosConfig = (method='get', url, data=null, headers={}) => {
  const myData = JSON.stringify(data);
  return {
    method: method,
    url: `${CONSTANT.APP_BASE_URL}/${url}`,
    data: myData,
    headers: {
      Authorization: `Bearer ${getAccessToken()}`,
      'Content-Type': 'application/json'
    }
  }
};

export default makeConfig;
