import axios from "axios";

const baseUrl = "http://localhost:3001/api/v1/budgets";

const budgetService = {
  getAll: async (config, filters) => {
    let finalUrl;

    if (filters.month && filters.year && filters.createdBy) {
      finalUrl = `${baseUrl}?month=${filters.month}&year=${filters.year}&createdBy=${filters.createdBy}`;
    } else {
      finalUrl = baseUrl;
    }

    const { data } = await axios.get(finalUrl, config);
    return data;
  },
  getOne: async (config, id) => {
    const { data } = await axios.get(`${baseUrl}/${id}`, config);
    return data;
  },
  store: async (newBudget, config) => {
    const { data } = await axios.post(baseUrl, newBudget, config);
    return data;
  },
  delete: async (id, config) => {
    const { data } = axios.delete(`${baseUrl}/${id}`, config);
    return data;
  },
};

export default budgetService;
