import React from "react";
import axios from "axios";
import errorHandler from "../utils/errorHandler";

const BACKENDURI = "https://job-listing-ufa4.onrender.com/api/v1";
export const checkLogin = async (name, email, password) => {
  try {
    const reqUrl = `${BACKENDURI}/auth/login`;
    const response = await axios.post(reqUrl, {
      name,
      email,
      password,
    });
    return response;
  } catch (error) {
    errorHandler("Check Your Password/Username!");
  }
};

export const register = async (name, email, password) => {
  try {
    const reqUrl = `${BACKENDURI}/auth/register`;
    const response = await axios.post(reqUrl, { name, email, password });
    return response;
  } catch (error) {
    errorHandler("Api Failed!");
  }
};
