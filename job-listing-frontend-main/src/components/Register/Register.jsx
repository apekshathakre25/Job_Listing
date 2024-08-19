import React, { useEffect, useState } from "react";
import styles from "./Register.module.css";
import { Link } from "react-router-dom";
import { register } from "../../apis/auth";
import toast,{ Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import errorHandler from "../../utils/errorHandler";
const Register = () => {
    const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [isValid,setIsValid] = useState(true)
  const [error,setError] = useState({
    name: "",
    email: "",
    password: "",
  })

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
    
  };
  const createUser = async(name,email,password) => {
         const response = await register(name,email,password)
         
         if(response?.status==201) {
          toast.success('Account Created Successfully!', {
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

          setTimeout(()=>{
           navigate('/login')
          },2000)
          
         }
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    setError({
      name: "",
      email: "",
      password: "",
    })
 setIsValid(true)
 let valid = true;
    if (!formData.name.trim().length) {
      setError((prev) => {
        return {
          ...prev,
          name: "Name Field is Required !",
        };
      });
      setIsValid(false)
      valid = false
    } else if (!/^[a-zA-Z\s]+$/.test(formData.name)) {
      setError((prev) => {
        return {
          ...prev,
          name: "Name should contain only letters and spaces !",
        };
      });
      setIsValid(false)
      valid = false

    }
    if (!formData.email.trim().length) {
      setError((prev) => {
        return {
          ...prev,
          email: "Email Field is Required!",
        };
      });
      setIsValid(false)
      valid = false

    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      setError((prev) => {
        return {
          ...prev,
          email: "Email is not Valid!",
        };
      });
      setIsValid(false)
      valid = false

    }
    if (!formData.password.trim().length) {
      setError((prev) => {
        return {
          ...prev,
          password: "Password Field is Required!",
        };
      });
      setIsValid(false)
      valid = false

    } else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(formData.password)) {
      setError((prev) => {
        return {
          ...prev,
          password: "Password is not Valid!",
        };
      });
      setIsValid(false)
      valid = false

    }

   if(valid){
    createUser(formData.name,formData.email,formData.password)
   } 
  }

  useEffect(()=>{
    const token = localStorage.getItem("token")
    if(token) {
     navigate('/')
    }
   },[])

  return (
    <div className={styles.register}>
      <Toaster position="top-right" reverseOrder={false} />
      <div className={styles.register__container}>
        <h3 className={styles.register__heading}>Create an Account</h3>
        <p>Your Personal Job finder</p>
        <input
          type="text"
          name="name"
          placeholder="Name"
          onChange={(event) => {
            handleChange(event);
          }}
          style={{
            border: `${error.name ? "2px solid red": "2px solid #C2C2C2"}`
          }}
          required
        />
        <span className={styles.register__error}>{error.name}</span>
        <input
          type="text"
          name="email"
          placeholder="Email"
          onChange={(event) => {
            handleChange(event);
          }}
          style={{
            border: `${error.email ? "2px solid red": "2px solid #C2C2C2"}`
          }}
          required
        />
        <span className={styles.register__error}>{error.email}</span>
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={(event) => {
            handleChange(event);
          }}
          style={{
            border: `${error.password ? "2px solid red": "2px solid #C2C2C2"}`
          }}
          required
        />
        <span className={styles.register__error}>{error.password}</span>
        <button className={styles.register__submitbtn} onClick={(event)=>{
          handleSubmit(event)
        }}>Create Account</button>
        <p className={styles.register__text}>
          Already have an account?{" "}
          <Link to="/login" className={styles.register__navigate}>
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
