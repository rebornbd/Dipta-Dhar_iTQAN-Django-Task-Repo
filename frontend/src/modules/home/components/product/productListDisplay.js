import Axios from "axios";
import { useParams, useHistory } from 'react-router';
import React, { useState, useEffect } from 'react';

import { Products } from "./products";
import { Mycarousel } from "../common/mycarousel";
import { ProductCarousel } from "../common/productcarousel";
import { Header } from "../../../shared/header";
import { Footer } from "../../../shared/footer";
import Loading, { HFLoading } from "../../../shared/loading";
import { axiosConfig } from "../../../shared/core/config";
import useApi from "../../../../api";
import styles from "./productListDisplay.module.css";


const ProductListdisplay = ({ }) => {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [productLoading, setProductLoading] = useState(false);

  const { categoryId } = useParams();
  const { GET } = useApi();


  useEffect(() => {
    const preLoad = async () => {
      await GET(
        "api/categories/",
        (res) => {
          console.log(res);
          setCategories(res?.data);
        },
        (err) => console.log(err)
      );
    };
    preLoad();
  }, []);

  useEffect(() => {
    if (categories.length >= 0) {
      setProductLoading(true);

      Axios(axiosConfig('get', `api/products/?search=${categoryId}`))
        .then(res => res?.data)
        .then(res => {
          console.log(res);
          setProducts(res);
          setProductLoading(false);
        })
        .catch(err => {
          setProductLoading(false);
        })
    }
  }, [categories]);

  const categoryHandler = (categoryId) => {
    setProductLoading(true);

    Axios(axiosConfig('get', `api/products/?search=${categoryId}`))
      .then(res => res?.data)
      .then(res => {
        console.log(res);
        setProducts(res);
        setProductLoading(false);
      })
      .catch(err => {
        setProductLoading(false);
      })
  };

  return (categories.length <= 0)
  ? <HFLoading />
  : <>
      <Header />

      <div className={styles.carouselContainer}>
        <ProductCarousel 
          categories={categories}
          categoryHandler={categoryHandler}
        />
      </div>

      <div className={styles.productContent}>
        {productLoading
          ? <Loading message="products loading" />
          : (products && products.length <= 0)
            ? <div>This category have no products!</div>
            : <Products products={products} />
        }
      </div>
      <Footer />
  </>
}

export {
  ProductListdisplay,
};
