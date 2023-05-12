import axios from "axios";
import { createParams } from "../utils/url";

const API_URL = "http://localhost:3000";

// Fetch multiple comics
export async function getComics(params) {
  try {
    const searchParams = createParams(params);
    const url = `${API_URL}/comics?${searchParams}`;
    console.log("Fetching:", url);
    const results = await axios.get(url);
    console.log("Fetched comics");
    return results.data;
  } catch (error) {
    console.error(error.message);
  }
}

// Fetch one comic
export async function getComic(comicId) {
  try {
    const url = `${API_URL}/comic/${comicId}`;
    const results = await axios.get(url);
    console.log("Fetched 1 comic");
    return results.data;
  } catch (error) {
    console.error(error.response.data);
  }
}

// Fetch comics with character x
export async function getComicsWith(characterId) {
  try {
    const url = `${API_URL}/comics/${characterId}`;
    console.log(url);
    const results = await axios.get(url);
    console.log("Fetched comics with X");
    return results.data;
  } catch (error) {
    console.error(error.message);
  }
}

// Fetch multiple characters
export async function getCharacters(params) {
  try {
    const searchParams = createParams(params);
    const url = `${API_URL}/characters?${searchParams}`;
    console.log("Fetching", url);
    const results = await axios.get(url);
    console.log("Fetched characters");
    return results.data;
  } catch (error) {
    console.error(error.message);
  }
}

// Fetch one character
export async function getCharacter(characterId) {
  try {
    const url = `${API_URL}/character/${characterId}`;
    const results = await axios.get(url);
    console.log("Fetched 1 character");
    return results.data;
  } catch (error) {
    console.error(error.response.data);
  }
}
