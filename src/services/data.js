import axios from "axios";
import { createOptions, createParams } from "../utils/url";

import { API_URL } from "./config";

// Fetch multiple comics
export async function getComics(token, params) {
  try {
    const searchParams = createParams(params);
    const options = createOptions(token);
    const url = `${API_URL}/comics?${searchParams}`;
    console.log("Fetching:", url);
    const results = await axios.get(url, options);
    console.log("Fetched comics");
    return results.data;
  } catch (error) {
    console.error(error.message);
  }
}

// Fetch one comic
export async function getComic(token, comicId) {
  try {
    const options = createOptions(token);
    console.log(options);
    const url = `${API_URL}/comic/${comicId}`;
    const results = await axios.get(url, options);
    console.log("Fetched 1 comic");
    return results.data;
  } catch (error) {
    console.error(error.response.data);
  }
}

// Fetch comics with character x
export async function getComicsWith(token, characterId) {
  try {
    const url = `${API_URL}/comics/${characterId}`;
    const options = createOptions(token);
    console.log(url);
    const results = await axios.get(url, options);
    console.log("Fetched comics with X");
    return results.data;
  } catch (error) {
    console.error(error.message);
  }
}

// Fetch multiple characters
export async function getCharacters(token, params) {
  try {
    const searchParams = createParams(params);
    const url = `${API_URL}/characters?${searchParams}`;
    const options = createOptions(token);
    console.log("Fetching", url);
    const results = await axios.get(url, options);
    console.log("Fetched characters");
    return results.data;
  } catch (error) {
    console.error(error.message);
  }
}

// Fetch one character
export async function getCharacter(token, characterId) {
  try {
    const url = `${API_URL}/character/${characterId}`;
    const options = createOptions(token);
    const results = await axios.get(url, options);
    console.log("Fetched 1 character");
    return results.data;
  } catch (error) {
    console.error(error.message);
  }
}
