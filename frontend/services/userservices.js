import axios from "axios";

const BASE_URL = "http://localhost:3001/users";

const getAll = () => {
  const request = axios.get(BASE_URL);
  return request.then((response) => response.data);
};

export { getAll };
