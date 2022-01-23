import { Link } from "react-router-dom";
import { useParams, useHistory } from 'react-router';
import React, { useState, useEffect} from "react";

import { getAccessToken, getUserData, logout } from "../core/token";
import styles from "./header.module.css";


export default function Header() {
  const [token, setToken] = useState(null);
  const [adminUser, setAdminUser] = useState(null);
  const history = useHistory();


  useEffect(() => {
    setToken(getAccessToken());

    const userData = JSON.parse(getUserData());
    setAdminUser(userData);
  }, []);

  const logoutHandler = () => {
    logout();
    history.push("/landing");
  };
  

  return (
    <nav className={styles.container}>
      <div className={styles.sectionLeft}>
        <ul className={styles.navLinks}>
          <li className={`${styles.navLinkItem1} ${styles.logoWrap}`} onClick={() => history.push('/')}>
            iTQAN Frontend
          </li>

          {(!!adminUser && adminUser?.is_superuser) && <>
            <li className={styles.navLinkItem}>
              <Link to="/admin">ADMIN DASHBOARD</Link>
            </li>
            <li className={styles.navLinkItem}>
              <Link to="/category">Category</Link>
            </li>
          </>}

        </ul>
      </div>

      <div className={styles.sectionCenter}>
      </div>

      <div className={styles.sectionRight}>
        <ul className={styles.navLinks}>
          {(!!token)
            ? <>
                <li className={`${styles.navLogoutBtn} ${styles.buttonLogoutItem}`}>
                  <div onClick={logoutHandler}>LOGOUT</div>
                </li>
              </>

            : <>
                <li className={`${styles.navBtn} ${styles.buttonItem}`}>
                  <Link to="/login">Log In</Link>
                </li>
                <li className={`${styles.navBtn} ${styles.buttonItem}`}>
                  <Link to="/signup">Sign Up</Link> 
                </li>
              </>
          }
        </ul>
      </div>
    </nav>
  );
}
