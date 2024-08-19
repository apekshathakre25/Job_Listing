import React from 'react'
import styles from './LoginPage.module.css'
import Login from '../../components/Login/Login'

import Banner from '/assets/images/banner-2.jpg'
const LoginPage = () => {
  return (
    <div className={styles.login}>
        <Login/>
        <img src={Banner} alt='error'/>
    </div>
  )
}

export default LoginPage