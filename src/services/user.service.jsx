import axios from "axios";
import { BACKEND_URL } from "./constant.service";

export async function getUsers() {
  const response = await axios.get(`${BACKEND_URL}/users`);
  return response.data;
}

export async function getDoctor() {
  const response = await axios.get(`${BACKEND_URL}/users/doctor`);
  return response.data;
}

export async function getUserById(id) {
  const response = await axios.get(`${BACKEND_URL}/users/${id}`);
  return response.data;
}

export async function register(form) {
  const response = await axios.post(`${BACKEND_URL}/users/register`, form);
  return response.data;
}

export async function delUser(id) {
  const response = await axios.delete(`${BACKEND_URL}/users/delete/${id}`);
  return response.data;
}

export async function login(form) {
  const response = await axios.post(`${BACKEND_URL}/users/login`, form);
  return response.data;
}

export async function getActiveUser() {
  const response = await axios.get(`${BACKEND_URL}/users/activeUser`);
  return response.data;
}

export async function logout(id) {
  const response = await axios.post(`${BACKEND_URL}/users/logout/${id}`);
  return response.data;
}
