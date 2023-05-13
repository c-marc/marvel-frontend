import axios from "axios";
import { createOptions } from "../utils/url";

const API_URL = "http://localhost:3000";

export async function createUser(data) {
  const { email, username, password } = data;
  try {
    const url = `${API_URL}/user/signup`;
    const results = await axios.post(url, { email, username, password });
    return results.data;
  } catch (error) {
    // TODO: pretty
    console.error(error.response.data);
  }
}

export async function authenticateUser(data) {
  const { email, password } = data;
  try {
    const url = `${API_URL}/user/login`;
    const results = await axios.post(url, { email, password });
    return results.data;
  } catch (error) {
    // TODO: pretty
    console.error(error.response.data);
  }
}

export async function authenticateUserFromToken(token) {
  try {
    const url = `${API_URL}/user`;
    // const options = { headers: { authorization: `Bearer ${token}` } };
    const options = createOptions(token);
    const results = await axios.get(url, options);
    return results.data;
  } catch (error) {
    // TODO: pretty
    console.error(error.response.data);
  }
}
