import Axios from "axios";
import { Table } from "antd";
import { useParams, useHistory } from 'react-router';
import React, { useState, useEffect } from "react";

import { Mycarousel } from "../home/components/common/mycarousel";
import { productColumns } from "./components/common/productColumns";
import Loading, { HFLoading } from "../shared/loading";
import { Header } from "../shared/header";
import { Footer } from "../shared/footer";
import { axiosConfig } from "../shared/core/config";
import useApi from "../../api";
import styles from "./admin.module.css";


const AdminPage = ({ }) => {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
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

      await GET(
        "api/products/",
        (res) => {
          console.log(res?.data);
          setProducts(res?.data);
        },
        (err) => console.log(err)
      );
    };
    preLoad();
  }, []);


  return (categories.length <= 0)
  ? <HFLoading />
  : <>
      <Header />
      <div className={styles.carouselContainer}>
        <Mycarousel 
          categories={categories}
        />
      </div>

      <div className={styles.mainCantainer}>
        <div className={styles.mainContentTitle}>Product List View Details:</div>
        {products && products.length > 0 &&
          <Table
            columns={productColumns()}
            dataSource={products} 
            pagination={{ 
              defaultPageSize: 5, 
              showSizeChanger: true, 
              pageSizeOptions: ['5', '10', '20', '30', '50', '100']
            }}
          />
        }
      </div>
      <Footer />
  </>
}


export {
  AdminPage,
};
