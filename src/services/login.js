import axios from "axios";

const baseUrl = "http://localhost:3001/api/v1/users";

const loginService = {
  login: async (credentials) => {
    const { data } = await axios.post(`${baseUrl}/login`, credentials, {
      withCredentials: true,
    });
    return data;
  },
  register: async (newUser) => {
    const { data } = await axios.post(`${baseUrl}/register`, newUser);
    return data;
  },
  getUser: async (id) => {
    const { data } = await axios.post(`${baseUrl}/profile`, id, {
      withCredentials: true,
    });
    return data;
  },
  update: async (id, userToUpdate) => {
    const { data } = await axios.put(`${baseUrl}/profile/${id}`, userToUpdate, {
      withCredentials: true,
    });
    return data;
  },
};

export default loginService;
