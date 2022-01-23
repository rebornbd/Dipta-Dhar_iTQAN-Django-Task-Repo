import React from "react";
import styles from "./footer.module.css";

export default function Footer() {
  const githubLink = "https://github.com/rebornbd";

  return (
    <nav className={styles.container}>
      <div className={styles.copyright}>
        made with ♡ by 
        <a
          href={githubLink}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.itemLink}
          >
            <span>dipta</span>
          </a>
      </div>
    </nav>
  );
}
