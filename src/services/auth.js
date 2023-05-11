import axios from "axios";

const API_URL = "http://localhost:3000";

export async function createUser(data) {
  const { username, password } = data;
  try {
    // const url = `${API_URL}/user/signup`;
    // const results = await axios.post(url, {username, password});
    // return results.data;
    return { id: 666, token: "test" };
  } catch (error) {
    console.error(error.response.data);
  }
}

export async function authenticateUser(data) {
  const { username, password } = data;
  try {
    return { id: 666, token: "test" };
  } catch (error) {
    console.error(error.response.data);
  }
}
