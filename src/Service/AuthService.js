// src/services/authService.js
import api from './api';

const TOKEN_KEY = 'token';
const USERNAME_KEY = 'username';
const USER_TYPE_KEY = 'userType';

export function getToken() {
  return localStorage.getItem(TOKEN_KEY);
}

export function isAuthenticated() {
  return !!getToken();
}

export function getCurrentUser() {
  return {
    username: localStorage.getItem(USERNAME_KEY) || null,
    userType: localStorage.getItem(USER_TYPE_KEY) || null,
  };
}

export function logout() {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(USERNAME_KEY);
  localStorage.removeItem(USER_TYPE_KEY);
}

export async function loginCustomer({ username, password }) {
  const { data } = await api.post('/auth/customer/login', { username, password });
  localStorage.setItem(TOKEN_KEY, data.token);
  localStorage.setItem(USERNAME_KEY, data.username);
  localStorage.setItem(USER_TYPE_KEY, data.userType);
  // console.log(data);
  return data; // { token, username, userType }
}

export async function loginMember({ username, password }) {
  const { data } = await api.post('/auth/member/login', { username, password });
  localStorage.setItem(TOKEN_KEY, data.token);
  localStorage.setItem(USERNAME_KEY, data.username);
  localStorage.setItem(USER_TYPE_KEY, data.userType);
  return data;
}

export async function registerCustomer(payload) {
  // payload: { username, password, ... } as your backend expects
  const { data } = await api.post('/auth/customer/register', payload);
  localStorage.setItem(TOKEN_KEY, data.token);
  localStorage.setItem(USERNAME_KEY, data.username);
  localStorage.setItem(USER_TYPE_KEY, data.userType);
  return data;
}