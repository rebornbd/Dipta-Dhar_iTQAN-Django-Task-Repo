import Axios from "axios";
import { useParams, useHistory } from 'react-router';
import React, { useState, useEffect } from 'react';

import { ProductCarousel } from "../common/productcarousel";
import { Mycarousel } from "../common/mycarousel";
import { Header } from "../../../shared/header";
import { Footer } from "../../../shared/footer";
import Loading, { HFLoading } from "../../../shared/loading";
import { axiosConfig } from "../../../shared/core/config";
import useApi from "../../../../api";
import styles from "./productDisplay.module.css";


const Productdisplay = ({  }) => {
  const [categories, setCategories] = useState([]);
  const [product, setProduct] = useState(null);
  const [productLoading, setProductLoading] = useState(false);

  const { productId } = useParams();
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

      Axios(axiosConfig('get', `api/products/${productId}`))
        .then(res => res?.data)
        .then(res => {
          console.log(res);
          setProduct(res);
          setProductLoading(false);
        })
        .catch(err => {
          setProductLoading(false);
        })
    }
  }, [categories]);


  return (categories.length <= 0)
  ? <HFLoading />
  : <>
    <Header />

    <div className={styles.carouselContainer}>
      <Mycarousel 
        categories={categories}
      />
    </div>

    <div className={styles.productItemContent}>
      {productLoading
        ? <Loading message="products loading" />
        : (!product)
          ? <div>This product ID doesn't dave any product!</div>
          : <Product product={product} />
      }
    </div>
    <Footer />
  </>
}

const Product = ({ product }) => {
  const history = useHistory();


  return (
    <div className={styles.productItemInnerContainer}>
      <img src={product?.photo} alt={product?.name} className={styles.productItemImg} />
      <div className={styles.productItemMiddle}>
        <div className={styles.productItemName}>{product?.name}</div>
        <div className={styles.productItemCategoryName}>
          Category: 
            <span onClick={() => history.push(`/product-category/${product?.category?.id}`)}>
              {product?.category?.name}
            </span>
        </div>
      </div>
      <div className={styles.productItemDesc}>
        <div className={styles.productItemKey}>Short Description:</div>
        <div className={styles.productItemValue}>
          {(!product?.short_desc)
            ? `None`
            : product?.short_desc
          }
        </div>
      </div>
      <div className={styles.productItemDesc}>
        <div className={styles.productItemKey}>Long Description:</div>
        <div className={styles.productItemValue}>
          {(!product?.long_desc)
            ? `None`
            : product?.long_desc
          }
        </div>
      </div>
    </div>
  );
};

export {
  Productdisplay,
};
