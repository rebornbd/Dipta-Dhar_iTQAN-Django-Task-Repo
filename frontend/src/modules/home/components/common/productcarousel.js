import { Menu, Switch, Carousel } from "antd";
import { useParams, useHistory } from 'react-router';
import React from "react";
import styles from "./productcarousel.module.css";


const ProductCarousel = ({ categories, categoryHandler }) => {
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
            onClick={() => categoryHandler(category?.id)}
            src={category?.photo} 
            className={styles.carouselItemImg} 
            alt={category?.name || "category pic"} />
          <div className={styles.carouselItemTitle}>{category?.name}</div>
        </div>
      ))}
    </Carousel>
}

export {
  ProductCarousel,
};
