import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { editJob, createJob } from "../../apis/job";
import { DEFAULT_SKILLS } from "../../utils/constants";
import styles from "./AddJob.module.css";

const AddJob = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [stateData] = useState(state?.jobDetails);
  const [formData, setFormData] = useState({
    companyName: "" || stateData?.companyName,
    title: "" || stateData?.title,
    description: "" || stateData?.description,
    logoUrl: "" || stateData?.logoUrl,
    salary: "" || stateData?.salary,
    location: "" || stateData?.location,
    duration: "" || stateData?.duration,
    locationType: "" || stateData?.locationType,
    skills: stateData?.skills || [],
    aboutCompany: "" || stateData?.aboutCompany,
    information: "" || stateData?.information,
    aboutJob: "" || stateData?.aboutJob,
    companySize:"" || stateData?.companySize,

  });

  const handleFormData = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const createJobData = async () => {
    const response = await createJob({ ...formData });
    return response
    // console.log(response);
  };

  const addSkill = (event) => {
    const skill = event.target.value;
    const actualSkills = formData.skills;
    const updatedSkill = [...formData.skills, skill];
    const filteredSkill = actualSkills.filter((element) => element == skill);
    if (!filteredSkill.length) {
      setFormData({ ...formData, skills: updatedSkill });
    }
  };
  const removeSkill = (skill) => {
    const actualSkills = formData.skills;
    const filteredSkill = actualSkills.filter((element) => element !== skill);
    setFormData({ ...formData, skills: filteredSkill });
  };
  const handleSubmit =  async(event) => {
    event.preventDefault();
    if (state?.edit) {
     const response = await editJob(stateData?._id, formData);
     if(response?.status == 200){
      navigate(`/job-details/${stateData?._id}`);
     }
      return;
    } 
        const responseJob = await createJobData();
      if(responseJob?.status == 201) {
        navigate('/')
      }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
    }
  }, []);
  return (
    <div className={styles.job}>
      <h2 className={styles.job__header}>Add Job Description</h2>
      <div className={styles.job__body}>
        <div className={styles.job__fields}>
          <span>Company Name</span>
          <input
            type="text"
            placeholder="Enter your company name here"
            name="companyName"
            value={formData.companyName}
            onChange={(event) => {
              handleFormData(event);
            }}
          />
        </div>
        <div className={styles.job__fields}>
          <span>Add logo URL</span>
          <input
            type="text"
            placeholder="Enter the link"
            name="logoUrl"
            value={formData.logoUrl}
            onChange={(event) => {
              handleFormData(event);
            }}
          />
        </div>
        <div className={styles.job__fields}>
          <span>Company Size</span>
          <input
            type="text"
            placeholder="Company Size"
            name="companySize"
            value={formData.companySize}
            onChange={(event) => {
              handleFormData(event);
            }}
          />
        </div>
        <div className={styles.job__fields}>
          <span>Duration</span>
          <input
            type="text"
            placeholder="Enter the Duration"
            name="duration"
            value={formData.duration}
            onChange={(event) => {
              handleFormData(event);
            }}
          />
        </div>
        <div className={styles.job__fields}>
          <span>Job Position</span>
          <input
            type="text"
            placeholder="Enter Job Position"
            name="title"
            value={formData.title}
            onChange={(event) => {
              handleFormData(event);
            }}
          />
        </div>
        <div className={styles.job__fields}>
          <span>Description</span>
          <input
            type="text"
            placeholder="Enter Job Description"
            name="description"
            value={formData.description}
            onChange={(event) => {
              handleFormData(event);
            }}
          />
        </div>
        <div className={styles.job__fields}>
          <span>Monthly Salary</span>
          <input
            type="text"
            placeholder="Enter amount in rupees"
            name="salary"
            value={formData.salary}
            onChange={(event) => {
              handleFormData(event);
            }}
          />
        </div>
        <div className={styles.job__fields}>
          <span>Remote/Office</span>
          {/* <input type="text" placeholder="Enter your company name here" /> */}
          <select
            name="locationType"
            value={formData.locationType}
            onChange={(event) => {
              handleFormData(event);
            }}
          >
            <option value="remote">Remote</option>
            <option value="office">Office</option>
          </select>
        </div>
        <div className={styles.job__fields}>
          <span>Location</span>
          <input
            type="text"
            placeholder="Enter Location"
            name="location"
            value={formData.location}
            onChange={(event) => {
              handleFormData(event);
            }}
          />
        </div>
        <div
          className={`${styles.job__fields} ${styles.job__description_input}`}
        >
          <span>About Job/Internship</span>
          <textarea
            placeholder="Type about the job/internship"
            name="aboutJob"
            value={formData.aboutJob}
            onChange={(event) => {
              handleFormData(event);
            }}
          />
        </div>
        <div
          className={`${styles.job__fields} ${styles.job__description_input}`}
        >
          <span>About Company</span>
          <textarea
            placeholder="Type about your company"
            name="aboutCompany"
            value={formData.aboutCompany}
            onChange={(event) => {
              handleFormData(event);
            }}
          />
        </div>
        <div className={styles.job__fields}>
          <span>Skills Required</span>
          <select
            name="skills"
            value={formData.skills}
            onChange={(event) => {
              addSkill(event);
            }}
          >
            <option>Select</option>
            {DEFAULT_SKILLS.map((element) => (
              <option value={element}>{element}</option>
            ))}
          </select>
        </div>
        <div
          style={{
            display: "flex",
            width: "100%",
          }}
        >
          {formData?.skills.map((element) => {
            return (
              <>
                <div className={styles.job__skills_remove}>
                  <span>{element}</span>
                  <button
                    onClick={() => {
                      removeSkill(element);
                    }}
                  >
                    X
                  </button>
                </div>
              </>
            );
          })}
        </div>
        <div className={styles.job__fields}>
          <span>Information</span>
          <input
            type="text"
            placeholder="Enter the additional information"
            name="information"
            value={formData.information}
            onChange={(event) => {
              handleFormData(event);
            }}
          />
        </div>
        <div className={styles.job__buttons}>
          <button
            className={styles.job__btn_cancel}
            onClick={() => {
              navigate("/");
            }}
          >
            Cancel
          </button>
          <button
            className={styles.job__btn_add}
            onClick={(event) => {
              handleSubmit(event);
            }}
          >
            {state?.edit ? "Edit Job" : "+ Add Job"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddJob;
