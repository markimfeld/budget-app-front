import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const baseUrl = `${process.env.BACKEND_BASE_URL}/api/v1/expenses`;

const expenseService = {
  getAll: async () => {
    const { data } = await axios.get(baseUrl, { withCredentials: true });
    return data;
  },
  getOne: async (id) => {
    const { data } = await axios.get(`${baseUrl}/${id}`, {
      withCredentials: true,
    });
    return data;
  },
  store: async (newExpense) => {
    const { data } = await axios.post(baseUrl, newExpense, {
      withCredentials: true,
    });
    return data;
  },
  del: async (id) => {
    const { data } = await axios.delete(`${baseUrl}/${id}`, {
      withCredentials: true,
    });
    return data;
  },
  edit: async (id, expenseToUpdate) => {
    const { data } = await axios.put(`${baseUrl}/${id}`, expenseToUpdate, {
      withCredentials: true,
    });
    return data;
  },
};

export default expenseService;
