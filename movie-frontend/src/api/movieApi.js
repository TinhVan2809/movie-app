import axios from "axios";

const API = import.meta.env.VITE_REACT_APP_API;

export const getTrending = (timeWindow = 'day') => axios.get(`${API}/trending/${timeWindow}`);
export const getPopular = () => axios.get(`${API}/popular`);
export const searchMovie = (q) => axios.get(`${API}/search?query=${q}`);
export const getTopRated = () => axios.get(`${API}/top-rated`);
export const getNowPlaying =() => axios.get(`${API}/now-playing`);
export const getUpComing = () => axios.get(`${API}/up-coming`);
export const getMovieDetail = (id) => axios.get(`${API}/movie/${id}`);
export const getMovieCredits = (id) => axios.get(`${API}/movie/${id}/credits`);

export const getTvPopular = () => axios.get(`${API}/tv/tv-popular`);
export const getTvTopRated = () => axios.get(`${API}/tv/tv-top-rated`);
export const getTvAir = () => axios.get(`${API}/tv/tv-on-the-air`);
export const getTvShowDetail = (id) => axios.get(`${API}/tv/${id}`);
export const getTvShowCredits = (id) => axios.get(`${API}/tv/${id}/credits`);
export const getTvShowVideos = (id) => axios.get(`${API}/tv/${id}/videos`);

//trailer 
export const getTrailerNowPlaying = () => axios.get(`${API}/trailers/latest`);
export const getTrailerPopular = () => axios.get(`${API}/trailers/latest-popular`);
export const getTrailerTopRated = () => axios.get(`${API}/trailers/latest-top-rated`);
export const getTrailerUpcoming = () => axios.get(`${API}/trailers/latest-up-coming`);
