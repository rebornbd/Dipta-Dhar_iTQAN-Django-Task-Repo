import Axios from "axios";
import { useParams, useHistory } from 'react-router';
import React, { useState, useEffect } from 'react';

import makeConfig from "../shared/core/config";
import Categories from "./components/categories";
import Loading, { HFLoading } from "../shared/loading";
import { Header } from "../shared/header";
import { Footer } from "../shared/footer";
import useApi from "../../api";
import styles from './category.module.css';


export default function CategoryPage() {
  const [categories, setCategories] = useState([]);
  const { GET } = useApi();


  useEffect( () => {
    const preLoad = async () => {
      await GET(
        "api/categories/",
        res => {
          console.log(res);

          setCategories(res?.data);
        },
        err => console.log(err)
      );
    };
    preLoad();
  }, []);

  const deleteHandler = (categoryId) => {
    const filterBrand = categories.filter(category => category?.id !== categoryId);
    setCategories(filterBrand);
  };


  return (categories.length <= 0)
  ? <HFLoading />
  : <>
      <Header />
      <Categories
        categories={categories}
        deleteHandler={deleteHandler}
      />
      <Footer />
    </>
}
