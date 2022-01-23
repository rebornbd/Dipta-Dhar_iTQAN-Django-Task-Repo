import Axios from "axios";
import { useParams, useHistory } from 'react-router';
import React, { useState, useEffect, useRef } from 'react';

import { Header } from '../../shared/header';
import { Footer } from '../../shared/footer';
import CONSTANT from '../../../constant';
import makeConfig, { axiosConfig } from "../../shared/core/config";
import useApi from "../../../api";
import styles from "./createCategory.module.css";


export default function CreateCategory() {
  const [categoryName, setCategoryName] = useState('');
  const [cursor, setCursor] = useState(null);
  const [errors, setErrors] = useState(null);

  const inputTextRef = useRef(null);
  const history = useHistory();
  const { GET, POST } = useApi();

  useEffect(() => {
    const preLoad = async () => {
      await GET(
        "api/categories/",
        res => {
          console.log("OK");
        },
        err => console.log(err)
      );
    };
    preLoad();
  }, []);


  const handleForm = () => {
    const data = { "name": categoryName };
    Axios(axiosConfig('post', 'api/categories/', data))
      .then(res => res?.data)
      .then(res => {
        // console.log(res);
        history.push('/category');
      })
      .catch(err => {
        // console.log(err?.response?.data);
        setErrors(err?.response?.data)
      })
  };

  const inputHandler = (e) => {
    setCategoryName(e.target.value);
    setCursor(e.target.selectionStart);
  };

  const Errors = () => {
    let count = 1;

    return (errors === null)
    ? <div className={styles.topMargin}></div>
    : (
      <div className={`${styles.errorList} ${styles.topMargin}`}>
        {Object.keys(errors).map((errorObjKey, index1) => (
          errors[errorObjKey].map((error, index2) => (
            <p key={`${index1}-${index2}`}>{`${count++}) ${error}`}</p>
          ))
        ))}
      </div>
    );
  }

  const BrandForm = () => {
    return (
      <div className={styles.container}>
        <Errors />
        <input
          type='text'
          className={styles.brandName}
          placeholder="Enter category name"
          value={categoryName}
          onChange={(e) => inputHandler(e)}
          ref={inputTextRef}
          autoFocus
          required
        />

        <button onClick={handleForm} className={styles.createBrandBtn}>Create Category</button>
      </div>
    )
  };

  return (
    <>
      <Header />
      <BrandForm />
      <Footer />
    </>
  )
}
