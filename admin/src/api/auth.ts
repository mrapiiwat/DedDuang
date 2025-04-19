import axios from "axios";
import { BASE_URL, ADMIN } from "../api/endpoint.api";

export const cuurrentAdmin = async () => {
  return await axios.get(`${BASE_URL}${ADMIN}`, {
    withCredentials: true,
  });
};
