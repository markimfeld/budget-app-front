import axios from "axios";
import { BACKEND_BASE_URL } from "../services/api";

const baseUrl = `${BACKEND_BASE_URL}/api/v1/budgets`;

const budgetService = {
  getAll: async (filters) => {
    let finalUrl;

    if (filters.month && filters.year) {
      finalUrl = `${baseUrl}?month=${filters.month}&year=${filters.year}`;
    } else {
      finalUrl = baseUrl;
    }

    const { data } = await axios.get(finalUrl, { withCredentials: true });
    return data;
  },
  getOne: async (id) => {
    const { data } = await axios.get(`${baseUrl}/${id}`, {
      withCredentials: true,
    });
    return data;
  },
  store: async (newBudget) => {
    const { data } = await axios.post(baseUrl, newBudget, {
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
  update: async (id, budgetToUpdate) => {
    const { data } = await axios.put(`${baseUrl}/${id}`, budgetToUpdate, {
      withCredentials: true,
    });
    return data;
  },
};

export default budgetService;
