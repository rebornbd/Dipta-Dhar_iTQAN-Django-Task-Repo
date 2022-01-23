import Axios from "axios";
import { useParams, useHistory } from 'react-router';
import React, { useState, useEffect, useRef } from 'react';

import { Header } from '../../shared/header';
import { Footer } from '../../shared/footer';
import Loading from "../../shared/loading";
import CONSTANT from '../../../constant';
import makeConfig from "../../shared/core/config";
import styles from './createPhone.module.css';


export default function CreatePhone() {
  const [model, setModel] = useState('');
  const [brandId, setBrandId] = useState(-1);
  const [color, setColor] = useState('');
  const [jancode, setJancode] = useState('');
  const [brands, setBrands] = useState([]);
  const [errors, setErrors] = useState(null);


  const history = useHistory();

  useEffect(() => {
    Axios(makeConfig('get', `${CONSTANT.APP_BASE_URL}/api/brands/`))
    .then(res => res.data)
    .then(res => {
      setBrands(res);
    })
    .catch(err => console.log(err?.response?.data))
  }, []);

  const formValidity = () => {
    if (String(model).length >= 1 && String(jancode).length >= 1 && brandId !== -1)
      return true;
    return false;
  };

  const handleForm = () => {
    if (!formValidity) return;

    const data = {
      "model": model,
      "jancode": jancode,
      "color": color,
      "image": "",
      "brand": brandId
    };
    Axios(makeConfig('post', `${CONSTANT.APP_BASE_URL}/api/phones/phone/`, data))
    .then(res => res.data)
    .then(res => {
      history.push('/phone')
    })
    .catch(err => {
      console.log(err?.response?.data);
      setErrors(err?.response?.data);
    })
  };

  const Errors = () => {
    let count = 1;

    return (errors === null)
    ? null
    : <div className={styles.errorList}>
      {Object.keys(errors).map((errorObjKey, index1) => (
          errors[errorObjKey].map((error, index2) => (
            <p key={`${index1}-${index2}`}>{`${count++}) ${error}`}</p>
          ))
      ))}
    </div>
  }

  return (brands.length <= 0)
    ? <>
      <Header />
      <Loading />
      <Footer />
    </>
    : <>
      <Header />
      <div className={styles.container}>
        <Errors />
        <div className={styles.itemContainer}>
          <div className={styles.item}>
            <label>Model*</label>
            <input
              type='text'
              className={styles.modelName}
              value={model}
              onChange={(e) => setModel(e?.target?.value)}
            />
          </div>

          <div className={styles.item}>
            <label>Brand*</label>
            <select className={styles.brandName} onChange={(e) => setBrandId(e?.target?.value)}>
              <option value="">SELECT A BRAND</option>
              {brands && brands.map((brand, index) => (
                <option value={brand?.id} key={index}>{brand?.name}</option>
              ))}
            </select>
          </div>

          <div className={styles.item}>
            <label>JAN-Code*</label>
            <input
              type='text'
              className={styles.janCode}
              value={jancode}
              onChange={(e) => setJancode(e?.target?.value)}
            />
          </div>

          <div className={styles.item}>
            <label>Color</label>
            <input
              type='text'
              className={styles.colorName}
              value={color}
              onChange={(e) => setColor(e?.target?.value)}
            />
          </div>
          
          <div className={styles.item}>
            <label></label>
            <button 
              onClick={handleForm}
              disabled={!formValidity()}
              className={formValidity() 
                ? `${styles.createBtn} ${styles.createBtnActive}`
                : `${styles.createBtn}`}>Create Mobile Entry</button>
          </div>
        </div>
      </div>
      <Footer />
    </>
}
