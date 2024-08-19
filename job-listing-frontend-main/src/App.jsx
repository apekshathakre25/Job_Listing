import React from "react"
import {Routes,Route} from 'react-router-dom'

import HomePage from "./pages/HomePage/HomePage"
import LoginPage from "./pages/LoginPage/LoginPage"
import RegisterPage from "./pages/RegisterPage/RegisterPage"
import JobPage from "./pages/JobPage/JobPage"
import JobDetailsPage from "./pages/JobDetailsPage/JobDetailsPage"
import { ProtectedRoute } from "./components/ProtectedRoute/ProtectedRoute"
function App() {

  return (
    <>
       <Routes>
         <Route path="/login" element={<LoginPage/>}/>
         <Route path="/register" element={<RegisterPage/>}/>
         <Route path='/' element={<HomePage/>}/> 
         <Route path="/add-job" element={<JobPage/>} />
         <Route path="/job-details/:id" element={<JobDetailsPage/>} />
       </Routes>

    </>
  )
}

export default App
