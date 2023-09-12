import axios from "axios";

const baseUrl = `${process.env.DOLAR_API_BASE_URL}`;

const currencyService = {
  getDolarPrice: async (type) => {
    let finalUrl = `${baseUrl}/${type}`;

    const { data } = await axios.get(finalUrl);
    return data;
  },
};

export default currencyService;
