import { Menu, Switch, Carousel } from "antd";
import { useParams, useHistory } from 'react-router';
import React from "react";
import styles from "./mycarousel.module.css";


const Mycarousel = ({ categories }) => {
  const history = useHistory();

  return (categories && categories.length <= 0)
  ?  <Carousel>
      <div className={styles.carouselItemContainer}>
        <h3>No data found!</h3>
      </div>
    </Carousel>

  : <Carousel autoplay>
      {categories && categories.map((category, index) => (
        <div key={index} className={styles.carouselItemContainer}>
          <img 
            onClick={() => history.push(`/product-category/${category?.id}`)}
            src={category?.photo} 
            className={styles.carouselItemImg} 
            alt={category?.name || "category pic"} />
          <div className={styles.carouselItemTitle}>{category?.name}</div>
        </div>
      ))}
    </Carousel>
}

export {
  Mycarousel,
};
