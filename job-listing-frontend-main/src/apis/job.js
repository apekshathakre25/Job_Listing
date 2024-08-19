
import axios from "axios";
import errorHandler from "../utils/errorHandler";


const BACKENDURI = "https://job-listing-ufa4.onrender.com/api/v1";
export const fetchJobById = async (jobId) => {
  try {
    const reqUrl = `${BACKENDURI}/jobs/details/${jobId}`;
    const response = await axios.get(reqUrl);
    return response.data;
  } catch (error) {
    errorHandler("Incorrect Job Id!");
  }
};

export const createJob = async ({
  companyName,
  title,
  description,
  logoUrl,
  salary,
  location,
  duration,
  locationType,
  aboutCompany,
  information,
  skills,
  aboutJob,
  companySize,
}) => {
  try {
    const reqUrl = `${BACKENDURI}/jobs/create`;
    const token = JSON.parse(localStorage.getItem("token"));
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    const response = await axios.post(reqUrl, {
      companyName,
      title,
      description,
      logoUrl,
      salary,
      location,
      duration,
      locationType,
      aboutCompany,
      information,
      skills,
      aboutJob,
      companySize,
    });
    return response;
  } catch (error) {
    errorHandler("Error While Creating Job!");
  }
};

export const editJob = async (jobId, jobPayload) => {
  try {
    const reqUrl = `${BACKENDURI}/jobs/edit/${jobId}`;
    const token = JSON.parse(localStorage.getItem("token"));
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    const response = await axios.put(reqUrl, jobPayload);
    return response;
  } catch (error) {
    errorHandler("Error While Editing Job!");
  }
};
export const getAllJob = async (title, skills) => {
  try {
    const filteredSkills = skills.join(",");
    const reqUrl = `${BACKENDURI}/jobs/all-job?title=${title}&skills=${filteredSkills}`;
    const response = await axios.get(reqUrl);
    return response;
  } catch (error) {
    errorHandler("Error While Editing Job!");
  }
};
