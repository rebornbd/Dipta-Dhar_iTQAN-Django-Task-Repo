import Axios from "axios";
import { useParams, useHistory } from 'react-router';
import React, { useState, useEffect } from 'react';

import { Header } from '../shared/header';
import { Footer } from '../shared/footer';
import Phones from "./components/phones";
import Loading from "../shared/loading";
import CONSTANT from '../../constant';
import makeConfig from "../shared/core/config";
import styles from './phone.module.css';


export default function PhonePage() {
  const [phones, setPhones] = useState([]);
  const [searchPhones, setSearchPhones] = useState([]);
  // const history = useHistory();

  useEffect(() => {
    Axios(makeConfig('get', 'api/categories/'))
      .then(res => res.data)
      .then(res => {
        setPhones(res);
      })
      .catch(err => console.log(err?.response?.data))
  }, []);

  const handleDeletePhone = (phoneId) => {
    const filterPhone = phones.filter(phone => phone?.id !== phoneId);
    setPhones(filterPhone);
  };

  const handleSearchPhone = (modelORjancode) => {
    Axios(makeConfig('get', `api/phones/?search=${modelORjancode}`))
      .then(res => res.data)
      .then(res => {
        setSearchPhones(res);
      })
      .catch(err => console.log(err?.response?.data))
  };


  return (phones.length <= 0)
  ? <Loading />
  : <>
      <Phones
        phones={phones} 
        queryPhones={searchPhones} 
        phoneHandler={handleDeletePhone} 
        searchHandler={handleSearchPhone}
      />
    </>
}
