import React from 'react'
import styles from './RegisterPage.module.css'
import Register from '../../components/Register/Register'
import Banner from '/assets/images/banner-2.jpg'
const RegisterPage = () => {
  return (
    <div className={styles.register}>
        <Register/>
        <img src={Banner} alt='error'/>
    </div>
  )
}

export default RegisterPage