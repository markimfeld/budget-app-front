import axios from "axios";

const baseUrl = "https://dolarapi.com/v1/dolares";

const currencyService = {
  getDolarPrice: async (type) => {
    let finalUrl = `${baseUrl}/${type}`;

    const { data } = await axios.get(finalUrl);
    return data;
  },
};

export default currencyService;
