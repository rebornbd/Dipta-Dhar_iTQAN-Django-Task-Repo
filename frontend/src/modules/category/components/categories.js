import Axios from "axios";
import { AiOutlinePlus as PlusIcon } from "react-icons/ai";
import { FaRegEdit as EditIcon } from "react-icons/fa";
import { RiDeleteBin6Line as DeleteIcon } from "react-icons/ri";
import { useParams, useHistory } from 'react-router';
import React from 'react';

import CONSTANT from '../../../constant';
import { getAccessToken } from "../../shared/core/token";
import makeConfig from "../../shared/core/config";
import useApi from "../../../api";
import styles from './categories.module.css';


export default function Categories({ categories, deleteHandler }) {
  const history = useHistory();
  const { DELETE } = useApi();

  const handleDelete = async (categoryId, categoryName) => {
    const isDelete = window.confirm(`DELETE ${categoryName}!`);
    if (isDelete === true) {
      await DELETE (
        `api/categories/${categoryId}/`,
        res => {
          console.log(res);
          deleteHandler(categoryId);
        },
        err => console.log(err)
      );
    }
  };

  return (
    <div className={styles.container}>
      <div 
        className={styles.newBrand} 
        onClick={() => history.push('/category/create') }
        ><PlusIcon className={styles.plusIcon} />CREATE NEW CATEGORY</div>

      {categories && categories.map((category, index) => (
        <div className={styles.brandItem} dataid={category?.id} key={index}>
          <div className={styles.brandItemName}>{category?.name}</div>
          <div className={styles.brandItemActions}>
            <div className={styles.icon}>
              <EditIcon className={styles.itemEdit} 
              onClick={() => history.push(`/category/${category?.id}`)} />
            </div>
            <div className={styles.icon}>
              <DeleteIcon 
                className={styles.itemDelete} 
                onClick={() => handleDelete(category?.id, category?.name)} />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
