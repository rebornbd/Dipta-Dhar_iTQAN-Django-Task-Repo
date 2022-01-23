import { Menu, Switch } from "antd";
import React from "react";
import styles from "./sidemenu.module.css";


const Sidemenu = ({ categories, theme, collapsed, themeHandler, collapsedHandler, productHandler }) => {
  return (
    <>
      <div className={styles.leftMenuTop}>
        <Switch
          checked={theme === "dark"}
          onChange={themeHandler}
          checkedChildren="Dark"
          unCheckedChildren="Light"
        />

        <Switch
          checked={collapsed === true}
          onChange={collapsedHandler}
          checkedChildren="Show"
          unCheckedChildren="Hide"
        />
      </div>
      <Menu
        defaultSelectedKeys={['0']}
        mode="inline"
        theme={theme}
        inlineCollapsed={collapsed}
      >
        {categories && categories.length <= 0
          ? <span className={styles.havenoCategory}>There have no category!</span>
          : categories.map((category, index) => (
              <Menu.Item
                onClick={() => productHandler(category?.id)}
                key={index}
                >{category?.name}</Menu.Item>
            )
        )}
      </Menu>
    </>
  );
}

export {
  Sidemenu
};
