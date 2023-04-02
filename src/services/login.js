import axios from "axios";

const baseUrl = "http://localhost:3001/api/v1/users/";

const loginService = {
  login: async (credentials) => {
    const { data } = await axios.post(`${baseUrl}/login`, credentials);
    return data;
  },
  register: async (newUser) => {
    const { data } = await axios.post(`${baseUrl}/register`, newUser);
    return data;
  },
};

export default loginService;
