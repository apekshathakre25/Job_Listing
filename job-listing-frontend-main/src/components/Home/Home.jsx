import React, { useEffect, useRef, useState } from "react";
import styles from "./Home.module.css";
import { useNavigate } from "react-router-dom";
import { DEFAULT_SKILLS } from "../../utils/constants";
import { useLocation } from "react-router-dom";
import { getAllJob } from "../../apis/job";
import LoadingSpin from "react-loading-spin";
import Profile from "/assets/images/profile.png";
import CompanyLogo from "/assets/icons/company.png";
import Paisa from "/assets/icons/paisa.png";
import India from "/assets/icons/india.png";
import Group from "/assets/icons/group.png";

import Cookies from "js-cookie";
const Home = () => {
  const navigate = useNavigate();
  const [token, setToken] = useState();
  const [allJobs, setAllJobs] = useState([]);
  const {state} = useLocation()
  const [title, setTitle] = useState("")
  const [skills, setSkills] = useState([])
  const titleValue = useRef(null)
 
  const removeToken = () => {
    const tokenValue = "";
    setToken(tokenValue);
    localStorage.removeItem("token");
  };
 const addSkill = (event) => {
  const newArr = skills.filter((skill)=>(
          skill === event.target.value
  ))
  if(!newArr.length) {
    setSkills([...skills,event.target.value])
  }
 }

 const removeSkill = (skill) => {

    const newArr = skills.filter((item)=>(
            item !== skill
    ))

   setSkills([...newArr])
   console.log(newArr)
 }
       
 
  const fetchAllJob = async() => {
      const response =  await getAllJob(title,skills);
      setAllJobs(response?.data)
  }

  useEffect(() => {
    const getToken = JSON.parse(localStorage.getItem("token"));
    setToken(getToken);
    fetchAllJob()

  }, []);

  return (
    <div className={styles.home}>
      <div className={styles.header}>
        <div className={styles.header__name}>Jobs India</div>
        {!token ? (
          <div className={styles.header__buttons}>
            <button
              className={styles.header__btn}
              onClick={() => {
                navigate("/login");
              }}
            >
              Login
            </button>
            <button
              className={`${styles.header__btn} ${styles.header__register}`}
              onClick={() => {
                navigate("/register");
              }}
            >
              Register
            </button>
          </div>
        ) : (
          <div className={styles.header__recruiter_container}>
            <button
              className={styles.header__btn}
              onClick={() => {
                removeToken();
              }}
            >
              Logout
            </button>
            <span className={styles.header__recruiter}>Hello! {state?.name || "Recruiter"} </span>
            <div className={styles.header__img}>
              <img
                src={Profile}
                alt="error"
                height="50px"
                width="50px"
              />
            </div>
          </div>
        )}
      </div>
      <div className={styles.home__body}>
        <div className={styles.home__search_container}>
          <input
            type="text"
            name="title"
            className={styles.home__searchbar}
            placeholder="Type any job title"
            onChange={(event)=>{
              setTitle(event.target.value)
            }}
            ref={titleValue}
          />
          <div className={styles.home__search_skills}>
            <div className={styles.home__skills_filter}>
              <select name="skill" className={styles.home__select_skill} onChange={(event)=>{
                addSkill(event)
              }}>
                <option disabled>Select</option>
                {DEFAULT_SKILLS.map((item) => {
                  return <option value={item}>{item}</option>;
                })}
              </select>
   {skills.map((skill)=>(
              <div className={styles.home__filters}>
                <span
                  className={styles.home__name}
                  style={{
                    marginLeft: "10px",
                  }}
                >
              {skill}
                </span>
                <button className={styles.home__cross_btn} onClick={()=>{
                    removeSkill(skill)
                }}>X</button>
              </div>
              ))}
            </div>
            <div className={styles.home__applyfilter_cont}>
              <button className={styles.home__applyfilter} onClick={()=>{
                fetchAllJob() 
              }}>Apply Filter</button>
              {token ? <button className={styles.home__applyfilter} onClick={()=>{
                navigate("/add-job")
              }}>+ Add Job</button> : <></> }
              <span onClick={()=>{
                setTitle("")
                setSkills([])
                titleValue.current.value=""
              }}>Clear</span>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.home__cards_cont}>
        {allJobs?.data?.length > 0 ?  allJobs.data?.map((job)=>(
        <div className={styles.cards}>
          <div className={styles.cards__details_cont}>
            <img src={job?.logoUrl} alt="error" height="50px" width="50px" />
            <div className={styles.cards__details}>
              <span className={styles.cards__job_tile}>{job?.title}</span>
              <div className={styles.cards__jobdetail}>
                <span className={styles.cards_number_details}>
                  <img src={Group} alt="error" /> {job?.companySize}
                </span>
                <span className={styles.cards_number_details}>
                  <img src={Paisa} alt="error" /> {job?.salary}
                </span>
                <span className={styles.cards_number_details}>
                  <img src={India} alt="error" height="30px" width="30px" />{" "}
                  {job?.location}
                </span>
              </div>
              <div className={styles.cards__location}>
                <span>{job?.duration}</span>
                <span>{job?.locationType}</span>
              </div>
            </div>
          </div>
          <div className={styles.cards__filters}>
              
            <div className={styles.cards__filters_cont}>
              {job?.skills.map((skill)=>(
              <div className={styles.cards__filters_card}>{skill}</div>
              ))}
            </div>

            <div className={styles.cards__btncont}>
              {token ? <button className={styles.home__applyfilter} onClick={()=>{
                    
                        navigate("/add-job", {
                          state: {
                            jobId: job?._id,
                            jobDetails: job,
                            edit: true,
                          },
                        })
                      }}  >Edit Job</button> : <></>}
              <button className={styles.home__applyfilter} onClick={()=>{
                   navigate(`/job-details/${job?._id}`,{
                    state: {
                      name: state?.name
                    }
                   })
              }}>View Details</button>
            </div>
          </div>
        </div>
             )): <div className={styles.loader}> <LoadingSpin 
             primaryColor="#ED5353"
             secondaryColor="#333"
             size="100px"
             width='8px'
       />  </div>   }  
      </div>
    </div>
  );
};

export default Home;
