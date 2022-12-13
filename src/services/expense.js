import axios from "axios";

const baseUrl = "http://localhost:3001/api/v1/expenses";

const expenseService = {
  getAll: async (config) => {
    const { data } = await axios.get(baseUrl, config);
    return data;
  },
  store: async (newExpense, config) => {
    const { data } = await axios.post(baseUrl, newExpense, config);
    return data;
  },
};

export default expenseService;
