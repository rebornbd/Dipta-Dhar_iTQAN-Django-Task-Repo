import { useParams, useHistory } from 'react-router';
import React from "react";
import styles from "./products.module.css";


const Products = ({ products }) => {
  return (<>
    {products && products.map((product, index) => (
      <ProductItem product={product} key={index} />
    ))}
  </>);
}

const ProductItem = ({ product }) => {
  const history = useHistory();


  return (
    <div 
      onClick={() => history.push(`/product/${product?.id}`)}
      className={styles.productItemContainer}>
      <img src={product?.photo} className={styles.productItemImg} alt={product?.name} />
      <div className={styles.productItemName}>{product?.name}</div>
      <div className={styles.productItemShortDsc}>
        {product?.short_desc && String(product?.short_desc).length <= 60 
          ? `${product?.short_desc}`
          : `${String(product?.short_desc || "").substring(0, 60)} ...`
        }
      </div>
    </div>
  );
};

export {
  Products,
};
