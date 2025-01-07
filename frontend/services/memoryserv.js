import axios from "axios";

const BASE_URL = "/memorys";

const getAll = () => {
  const request = axios.get(BASE_URL);
  return request.then((response) => response.data);
};

const getMy = (id) => {
  const request = axios.get(`${BASE_URL}/${id}`);
  return request.then((response) => response.data);
};
const getGrantedMemories = (id) => {
  const request = axios.get(`${BASE_URL}/granted/${id}`);
  return request.then((response) => response.data);
};

const create = (newTeam) => {
  const request = axios.post(BASE_URL, newTeam);
  return request.then((response) => response.data);
};

const remove = (id) => {
  const request = axios.delete(`${BASE_URL}/${id}`);
  return request.then((response) => response.data);
};
const update = (id, newMemorie) => {
  const request = axios.put(`${BASE_URL}/${id}`, newMemorie);
  return request.then((response) => response.data);
};

export { getGrantedMemories, getMy, create, remove, update };
