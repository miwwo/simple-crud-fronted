import axios from "axios";


const REST_API_BASE_URL='http://localhost:8080/api/users';
// axios.defaults.headers.post["Content-Type"] = 'application/json'


export const listUsers = () => axios.get(REST_API_BASE_URL);

export const createUser = (user) => axios.post(REST_API_BASE_URL, user);

export const getUser = (userId) => axios.get(REST_API_BASE_URL + '/' + userId);
export const updateUser = (userId, updatedUser) => axios.put(REST_API_BASE_URL + '/' + userId, updatedUser);

export const deleteUser = (userId) => axios.delete(REST_API_BASE_URL + '/' + userId);

