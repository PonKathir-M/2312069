import axios from "axios";

const API = "http://localhost:3000/api/v1/notifications";

export const fetchNotifications = () => {
  return axios.get(API);
};

export const createNotification = (data) => {
  return axios.post(API, data);
};

export const markAsRead = (id) => {
  return axios.patch(`${API}/${id}/read`);
};

export const markAllRead = () => {
  return axios.patch(`${API}/read-all`);
};

export const deleteNotification = (id) => {
  return axios.delete(`${API}/${id}`);
};

export const unreadCount = () => {
  return axios.get(`${API}/unread-count`);
};