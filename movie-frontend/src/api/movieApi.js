import axios from "axios";

const API = import.meta.env.VITE_REACT_APP_API;

export const getTrending = (timeWindow = 'day') => axios.get(`${API}/trending/${timeWindow}`);
export const getPopular = () => axios.get(`${API}/popular`);
export const searchMovie = (q) => axios.get(`${API}/search?query=${q}`);
export const getTopRated = () => axios.get(`${API}/top-rated`);
export const getNowPlaying =() => axios.get(`${API}/now-playing`);
export const getUpComing = () => axios.get(`${API}/up-coming`);

export const getTvPopular = () => axios.get(`${API}/tv/popular`);
export const getTvTopRated = () => axios.get(`${API}/tv/top-rated`);
export const getTvAir = () => axios.get(`${API}/tv/on-the-air`);