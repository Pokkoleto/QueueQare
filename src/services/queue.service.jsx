import axios from "axios";
import { BACKEND_URL } from "./constant.service";

export async function getQueue() {
  const response = await axios.get(`${BACKEND_URL}/queue`);
  return response.data;
}

export async function getQueueByDepartmentId(id) {
  const response = await axios.get(`${BACKEND_URL}/queue/department/${id}`);
  return response.data;
}

export async function getQueueByToken(token) {
  const response = await axios.get(`${BACKEND_URL}/queue/${token}`);
  return response.data;
}

export async function addQueue(form) {
  const response = await axios.post(`${BACKEND_URL}/queue/add`, form);
  return response.data;
}

export async function delQueue(id) {
  const response = await axios.delete(`${BACKEND_URL}/queue/del/${id}`);
  return response.data;
}

export async function call(id) {
  const response = await axios.post(`${BACKEND_URL}/queue/call/${id}`);
  return response.data;
}

export async function skip(id) {
  const response = await axios.post(`${BACKEND_URL}/queue/skip/${id}`);
  return response.data;
}

export async function callSkip(form) {
  const response = await axios.post(`${BACKEND_URL}/queue/callSkip`, form);
  return response.data;
}

export async function move(form) {
  const response = await axios.post(`${BACKEND_URL}/queue/move`, form);
  return response.data;
}

export async function reset() {
  const response = await axios.post(`${BACKEND_URL}/queue/reset`);
  return response.data;
}
