import axios from "axios";

const baseUrl = "http://localhost:3001/api/v1/budgets";

const budgetService = {
  getAll: async (config, filters) => {
    let finalUrl;

    if (filters.month && filters.year) {
      finalUrl = `${baseUrl}?month=${filters.month}&year=${filters.year}`;
    } else {
      finalUrl = baseUrl;
    }

    const { data } = await axios.get(finalUrl, config);
    return data;
  },
  store: async (newBudget, config) => {
    const { data } = await axios.post(baseUrl, newBudget, config);
    return data;
  },
};

export default budgetService;
