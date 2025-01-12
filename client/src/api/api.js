import axios from "axios";

const API = axios.create({ baseURL: 'https://tool-management.onrender.com/api' });

export const registerMechanic = async (data) => {
  try {
    const response = await API.post("/users/register", data);
    return response.data;
  } catch (error) {
    console.error("Register Mechanic Error: ", error);
    throw error; 
  }
};

export const loginMechanic = async (data) => {
 
  try {
    const response = await API.post("/users/login", data);
    return response.data;
  } catch (error) {
    console.error("Login Mechanic Error: ", error);
    throw error;
  }
};

export const addTool = async (data) => {
  try {
    const response = await API.post("/tools/add", data);
    return response.data;
  } catch (error) {
    console.error("Add Tool Error: ", error);
    throw error;
  }
};

export const getTools = async () => {
  try {
    const response = await API.get("/tools");
    return response.data;
  } catch (error) {
    console.error("Get Tools Error: ", error);
    throw error;
  }
};

export const issueTool = async (data) => {
  try {
    const response = await API.post("/tools/issue", data);
    return response.data;
  } catch (error) {
    console.error("Issue Tool Error: ", error.response.data.message);
    alert(error.response.data.message)
    throw error;
  }
};

export const returnTool = async (data) => {
  try {
    const response = await API.post("/tools/return", data);
    return response.data;
  } catch (error) {
    console.error("Return Tool Error: ", error);
    alert(error.response.data.message)

    throw error;
  }
};


// API functions for handling update and delete
export const updateTool = async (id, formData) => {
  const response = await axios.put(`${import.meta.env.VITE_BASE_URL}/tools/edit/${id}`, formData);
  return response.data;
};

export const deleteTool = async (id) => {
  const response = await axios.delete(`${import.meta.env.VITE_BASE_URL}/tools/delete/${id}`);
  return response.data;
};

export const issueToolByAdmin= async (data) => {
  try {
    const response = await API.get("/tools/issue-tool-by-admin", data);
    return response.data;
  } catch (error) {
    console.error("Issue Tool Error: ", error.response.data.message);
    alert(error.response.data.message)
    throw error;
  }
};

// get all mechanic
export const getMechanic = async () => {
  try {
    const response = await API.get("/users");
    return response.data;
  } catch (error) {
    console.error("Get Tools Error: ", error);
    throw error;
  }
};