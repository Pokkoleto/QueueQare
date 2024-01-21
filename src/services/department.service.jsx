import axios from "axios";
import { BACKEND_URL } from "./constant.service";

export async function getDepartments() {
  const response = await axios.get(`${BACKEND_URL}/department`);
  return response.data;
}

export async function getDepartmentById(id) {
  const response = await axios.get(`${BACKEND_URL}/department/${id}`);
  return response.data;
}

export async function addDepartment(form) {
  const response = await axios.post(`${BACKEND_URL}/department/add`, form);
  return response.data;
}

export async function setDefault(id) {
  const response = await axios.put(
    `${BACKEND_URL}/department/setDefault/${id}`
  );
  return response.data;
}

export async function delDepartment(id) {
  const response = await axios.delete(`${BACKEND_URL}/department/delete/${id}`);
  return response.data;
}

export async function getActiveDoctor(id) {
  const response = await axios.get(
    `${BACKEND_URL}/department/doctor/active/${id}`
  );
  return response.data;
}

export async function getReadyDoctor(id) {
  const response = await axios.get(
    `${BACKEND_URL}/department/doctor/ready/${id}`
  );
  return response.data;
}
