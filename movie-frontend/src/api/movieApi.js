import axios from "axios";

const API = import.meta.env.VITE_REACT_APP_API;

export const getTrending = () => axios.get(`${API}/trending`);
export const getPopular = () => axios.get(`${API}/popular`);
export const searchMovie = (q) => axios.get(`${API}/search?query=${q}`);
export const getTopRated = () => axios.get(`${API}/top-rated`);
export const getNowPlaying =() => axios.get(`${API}/now-playing`);
export const getUpComing = () => axios.get(`${API}/up-coming`);