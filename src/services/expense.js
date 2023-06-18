import axios from "axios";

const baseUrl = "http://localhost:3001/api/v1/expenses";

const expenseService = {
  getAll: async (config) => {
    // const { data } = await axios.get(baseUrl, config);
    const { data } = await axios.get(baseUrl, { withCredentials: true });
    return data;
  },
  getOne: async (config, id) => {
    // const { data } = await axios.get(`${baseUrl}/${id}`, config);
    const { data } = await axios.get(`${baseUrl}/${id}`, {
      withCredentials: true,
    });
    return data;
  },
  store: async (newExpense, config) => {
    // const { data } = await axios.post(baseUrl, newExpense, config);
    const { data } = await axios.post(baseUrl, newExpense, {
      withCredentials: true,
    });
    return data;
  },
  del: async (id, config) => {
    // const { data } = await axios.delete(`${baseUrl}/${id}`, config);
    const { data } = await axios.delete(`${baseUrl}/${id}`, {
      withCredentials: true,
    });
    return data;
  },
  edit: async (id, expenseToUpdate, config) => {
    // const { data } = await axios.put(
    //   `${baseUrl}/${id}`,
    //   expenseToUpdate,
    //   config
    // );
    const { data } = await axios.put(`${baseUrl}/${id}`, expenseToUpdate, {
      withCredentials: true,
    });
    return data;
  },
};

export default expenseService;
