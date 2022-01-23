import Axios from "axios";
import { Menu, Switch, Carousel } from "antd";
import { useParams, useHistory } from 'react-router';
import React, { useState, useEffect } from "react";

import { Products } from "./components/product/products";
import { Sidemenu } from "./components/common/sidemenu";
import { Mycarousel } from "./components/common/mycarousel";
import Loading, { HFLoading } from "../shared/loading";
import { Header } from "../shared/header";
import { Footer } from "../shared/footer";
import { axiosConfig } from "../shared/core/config";
import useApi from "../../api";
import styles from "./home.module.css";

export default function HomePage() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [collapsed, setCollapsed] = useState(false);
  const [theme, setTheme] = useState("light");
  const [productLoading, setProductLoading] = useState(false);
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

  const themeHandler = () => {
    const themeValue = theme === "dark" ? "light" : "dark";
    setTheme(themeValue);
  };

  const collapsedHandler = () => {
    setCollapsed(!collapsed);
  };

  const productHandler = (categoryId) => {
    setProductLoading(true);

    Axios(axiosConfig('get', `api/products/?search=${categoryId}`))
      .then(res => res?.data)
      .then(res => {
        // console.log(res);
        setProducts(res);
        setProductLoading(false);
      })
      .catch(err => {
        setProductLoading(false);
      })
  };

  return categories.length <= 0 ? (
    <HFLoading />
  ) : (
    <>
      <Header />
      <div className={styles.mainContent}>
        <div className={styles.leftMenu}>
          <Sidemenu 
            categories={categories}
            theme={theme}
            collapsed={collapsed}
            themeHandler={themeHandler}
            collapsedHandler={collapsedHandler}
            productHandler={productHandler}
          />
        </div>
        <div className={styles.rightMenu}>
          <Mycarousel 
            categories={categories}
          />
        </div>
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
  );
}
