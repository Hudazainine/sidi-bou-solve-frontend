import axios from "axios";

const API = "http://127.0.0.1:8000/api/users";

const getToken = () => localStorage.getItem("access_token");

const headers = () => ({
  headers: { Authorization: `Bearer ${getToken()}` },
});

export const getProfile = () => axios.get(`${API}/profile/`, headers());

export const updateProfile = (data) =>
  axios.put(`${API}/profile/`, data, headers());

export const changePassword = (data) =>
  axios.put(`${API}/profile/password/`, data, headers());

export const uploadPhoto = (file) => {
  const formData = new FormData();
  formData.append("photo", file);
  return axios.put(`${API}/profile/photo/`, formData, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
      "Content-Type": "multipart/form-data",
    },
  });
};

export const getNotifications = () =>
  axios.get(`${API}/notifications/`, headers());

export const markNotificationsRead = () =>
  axios.put(`${API}/notifications/`, {}, headers());

export const getBadges = () => axios.get(`${API}/badges/`, headers());

export const getRecentActivity = () => axios.get(`${API}/recent/`, headers());

export const getFavoriteCategories = () =>
  axios.get(`${API}/categories/`, headers());
