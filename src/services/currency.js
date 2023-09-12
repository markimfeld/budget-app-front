import axios from "axios";
import { DOLAR_API_BASE_URL } from "../services/api";

const baseUrl = `${DOLAR_API_BASE_URL}`;

const currencyService = {
  getDolarPrice: async (type) => {
    let finalUrl = `${baseUrl}/${type}`;

    const { data } = await axios.get(finalUrl);
    return data;
  },
};

export default currencyService;
