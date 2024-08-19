import React from 'react'
import toast, { Toaster } from 'react-hot-toast';
const errorHandler = (error) => {
    toast.error(`${error}`, {
        style: {
          border: '1px solid #713200',
          padding: '16px',
          color: '#713200',
        },
        iconTheme: {
          primary: '#713200',
          secondary: '#FFFAEE',
        },
      });
}

export default errorHandler