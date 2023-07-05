import axios from "axios";
import { BASE_URL } from "./constant/Constants";

const instance = axios.create({
    baseUrl: BASE_URL,
});

export default instance;
