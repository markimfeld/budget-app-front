import axios from "axios";
import BACKEND_BASE_URL from "../services/api";

const baseUrl = `${BACKEND_BASE_URL}/api/v1/debts`;

const debtService = {
  getAll: async (filters) => {
    let finalUrl;

    if (filters.month && filters.year) {
      finalUrl = `${baseUrl}?month=${filters.month}&year=${filters.year}`;
    } else if (filters.isPaid !== undefined) {
      finalUrl = `${baseUrl}?isPaid=${filters.isPaid}`;
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
  store: async (newDebt) => {
    const { data } = await axios.post(baseUrl, newDebt, {
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
  update: async (id, debtToUpdate) => {
    const { data } = await axios.put(`${baseUrl}/${id}`, debtToUpdate, {
      withCredentials: true,
    });
    return data;
  },
  updateMany: async (debts) => {
    const { data } = await axios.put(`${baseUrl}`, debts, {
      withCredentials: true,
    });
    return data;
  },
};

export default debtService;
