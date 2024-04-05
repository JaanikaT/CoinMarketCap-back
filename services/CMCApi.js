import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const CMC_API = axios.create({
    baseURL: process.env.COINMARKETCAP_BASE_URL,
    headers: {
        "X-CMC_PRO_API_KEY": process.env.COINMARKETCAP_API_KEY,
    },
}); // instance, tegime axiosest koopia oma andmetega

export default CMC_API;