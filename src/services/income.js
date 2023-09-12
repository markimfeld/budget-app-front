import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

const baseUrl = `${process.env.BACKEND_BASE_URL}/api/v1/incomes`;

const incomeService = {
  getAll: async (filters) => {
    // let finalUrl = baseUrl;

    // const { data } = await axios.get(finalUrl, { withCredentials: true });
    // return data;

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
  store: async (newIncome) => {
    const { data } = await axios.post(baseUrl, newIncome, {
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
  update: async (id, incomeToUpdate) => {
    const { data } = await axios.put(`${baseUrl}/${id}`, incomeToUpdate, {
      withCredentials: true,
    });
    return data;
  },
};

export default incomeService;
