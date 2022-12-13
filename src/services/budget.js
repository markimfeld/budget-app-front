import axios from "axios";

const baseUrl = "http://localhost:3001/api/v1/budgets";

const budgetService = {
  getAll: async (config) => {
    const { data } = await axios.get(baseUrl, config);
    return data;
  },
  store: async (newBudget, config) => {
    const { data } = await axios.post(baseUrl, newBudget, config);
    return data;
  },
};

export default budgetService;
