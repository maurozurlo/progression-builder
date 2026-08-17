import React from 'react';
import styles from './Header.module.css';

import logo from '../img/pb-logo.svg';

const Header = () => {
  return <header>
    <div className={styles.logoContainer}>
      <img src={logo} alt="App logo"/>
      <h1>Progression<br/>  Builder</h1>
    </div>
    <div className={styles.infoContainer}>
    <small>v0.2</small>
      <small>by <a href="maurozurlo.com">ElMiauro</a></small>
    </div>
  </header>;
}

export default Header;