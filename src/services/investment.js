import axios from "axios";
import { BACKEND_BASE_URL } from "../services/api";

const baseUrl = `${BACKEND_BASE_URL}/api/v1/investments`;

const investmentService = {
  getAll: async (filters) => {
    let finalUrl = baseUrl;

    const { data } = await axios.get(finalUrl, { withCredentials: true });
    return data;
  },
  getOne: async (id) => {
    const { data } = await axios.get(`${baseUrl}/${id}`, {
      withCredentials: true,
    });
    return data;
  },
  store: async (newInvestment) => {
    const { data } = await axios.post(baseUrl, newInvestment, {
      withCredentials: true,
    });
    return data;
  },
  delete: async (id) => {
    const { data } = await axios.delete(`${baseUrl}/${id}`, {
      withCredentials: true,
    });
    return data;
  },
  update: async (id, investmentToUpdate) => {
    const { data } = await axios.put(`${baseUrl}/${id}`, investmentToUpdate, {
      withCredentials: true,
    });
    return data;
  },
};

export default investmentService;
