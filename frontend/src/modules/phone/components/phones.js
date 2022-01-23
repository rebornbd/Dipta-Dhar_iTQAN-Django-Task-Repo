import Axios from "axios";
import { AiOutlinePlus as PlusIcon } from "react-icons/ai";
import { FaRegEdit as EditIcon } from "react-icons/fa";
import { RiDeleteBin6Line as DeleteIcon } from "react-icons/ri";
import { useParams, useHistory } from 'react-router';
import React, { useState, useEffect } from 'react';

import CONSTANT from '../../../constant';
import makeConfig from "../../shared/core/config";
import styles from './phones.module.css';


export default function Phones({ phones, queryPhones, phoneHandler, searchHandler }) {
  const [searchValue, setSearchValue] = useState('');
  const [showPhones, setShowPhones] = useState([]);
  const history = useHistory();

  useEffect(() => {
    if (String(searchValue).length === 0) {
      setShowPhones(phones);
    } else {
      setShowPhones(queryPhones);
    }
  }, [searchValue]);

  const handleDelete = (phoneId, phoneModel) => {
    const isDelete = window.confirm(`DELETE ${phoneModel}!`);
    if (isDelete === true) {
      Axios(makeConfig('delete', `${CONSTANT.APP_BASE_URL}/api/phones/phone/${phoneId}/`))
        .then(res => res.data)
        .then(res => {
          phoneHandler(phoneId);
        })
        .catch(err => console.log(err?.response?.data))
    }
  };

  const handleSearch = (e) => {
    setSearchValue(e?.target?.value);
    searchHandler(searchValue);
  }

  return (
    <div className={styles.container}>

      <div className={styles.headerNav}>
        <div
          className={styles.newPhone}
          onClick={() => history.push('/phone/create') }
          ><PlusIcon className={styles.plusIcon} />CREATE NEW MOBILE MODEL</div>

        <input
          type='text'
          value={searchValue}
          className={styles.itemSearch}
          onChange={handleSearch}
          placeholder="enter model or jancode"
           />
      </div>
      
      <div className={`${styles.phoneItem} ${styles.phoneItemHeader}`}>
        <div className={`${styles.phoneSubItem} ${styles.phoneItemModel}`}>MODEL</div>
        <div className={`${styles.phoneSubItem} ${styles.phoneItemColor}`}>COLOR</div>
        <div className={`${styles.phoneSubItem} ${styles.phoneItemBrand}`}>BRAND</div>
        <div className={`${styles.phoneSubItem} ${styles.phoneItemJancode}`}>JAN-CODE</div>
        <div className={styles.phoneItemActions}>ACTIONS</div>
      </div>

      {showPhones && showPhones.map((phone, index) => (
        <div className={styles.phoneItem} dataid={phone?.id} key={index}>
          <div className={`${styles.phoneSubItem} ${styles.phoneItemModel}`}>{phone?.model}</div>
          <div className={`${styles.phoneSubItem} ${styles.phoneItemColor}`}>{phone?.color}</div>
          <div className={`${styles.phoneSubItem} ${styles.phoneItemBrand}`}>{phone?.brand?.name}</div>
          <div className={`${styles.phoneSubItem} ${styles.phoneItemJancode}`}>{phone?.jancode}</div>

          <div className={styles.phoneItemActions}>
            <div className={styles.icon}>
              <EditIcon className={styles.itemEdit} 
              onClick={() => history.push(`/phone/${phone?.id}`)} />
            </div>
            <div className={styles.icon}>
              <DeleteIcon 
                className={styles.itemDelete} 
                onClick={() => handleDelete(phone?.id, phone?.model)} />
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
