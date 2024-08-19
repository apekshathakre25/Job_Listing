import React from 'react'
import styles from './JobPage.module.css'
import AddJob from '../../components/AddJob/AddJob'

import Banner from '/assets/images/banner-2.jpg'

const JobPage = () => {
  return (
    <div className={styles.job}>
        <AddJob/>
        <img src={Banner} alt='error' />
    </div>
  )
}

export default JobPage