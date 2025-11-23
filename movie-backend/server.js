const express = require("express");
const axios = require("axios");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());

const API = "https://api.themoviedb.org/3";

// Trending
app.get("/api/trending/:timeWindow", async (req, res) => {
  try {
    const { timeWindow } = req.params;
    if (!['day', 'week'].includes(timeWindow)) {
      return res.status(400).json({ error: "Invalid time window specified. Use 'day' or 'week'." });
    }

    const resp = await axios.get(`${API}/trending/movie/${timeWindow}`, {
      params: { api_key: process.env.TMDB_API_KEY },
    });
    console.log("Response from TMDB:", {
      status: resp.status,
      headers: resp.headers,
      data: resp.data,
    });
    res.json(resp.data);
  } catch (err) {
    console.error("Error fetching from TMDB:", err.response?.data || err.message);
    res.status(500).json({ error: "Failed to fetch trending movies" });
  }
});

// Search
app.get("/api/search", async (req, res) => {
  try {
    const resp = await axios.get(`${API}/search/movie`, {
      params: {
        api_key: process.env.TMDB_API_KEY,
        query: req.query.query,
      },
    });
    res.json(resp.data);
  } catch (err) {
     console.log("❌ Trending error:", err.response?.data);
    res.status(500).json({ error: "Search error" });
  }
});

// Popular
app.get("/api/popular", async (req, res) => {
  try {
    const resp = await axios.get(`${API}/movie/popular`, {
      params: { api_key: process.env.TMDB_API_KEY },
    });
    res.json(resp.data);
  } catch (err) {
    console.error("Error fetching popular movies:", err.response?.data || err.message);
    res.status(500).json({ error: "Cannot load popular movies" });
  }
});

app.get("/api/test", (req,res)=>{
  res.json({ key: process.env.TMDB_API_KEY });
});

//top rated
app.get("/api/top-rated", async (req, res) => {
  try{
    const resp = await axios.get(`${API}/movie/top_rated`, {
      params: { api_key: process.env.TMDB_API_KEY,
                language: 'en-US'
       }, 
    });

    res.json(resp.data);
  } catch(err) {
    console.error("Error fetching top rated movies: ", err.response?.data || err.message);
    res.status(500).json({ error: "Cannot load top rated movies "});
  }
});

//now playing 
app.get("/api/now-playing", async (req, res) => {
  try{
    const resp = await axios.get(`${API}/movie/now_playing`, {
      params: { api_key: process.env.TMDB_API_KEY, 
        language: 'en-US'
      },
    });
    res.json(resp.data);
  } catch(err) {
    console.error("Error fetching now playing movies: ", err.response?.data || err.message);
    res.status(500).json({ error: "Cannot load now playing movies "});
  }
});

//up coming
app.get("/api/up-coming", async (req, res) => {
  try{
    const resp = await axios.get(`${API}/movie/upcoming`, {
      params: { api_key: process.env.TMDB_API_KEY, 
        language: 'en-US'
      },
    });
    res.json(resp.data);
  } catch(err) {
    console.error("Error fetching upcoming movies: ", err.response?.data || err.message);
    res.status(500).json({ error: "Cannot load upcoming movies"});
  } 
});

// tv show - POPPULAR
app.get("/api/tv/tv-popular", async (req, res) => { 
  try{
    const resp = await axios.get(`${API}/tv/popular`, {
      params: { 
        api_key: process.env.TMDB_API_KEY, 
        language: 'en-US'
      },
    });
    res.json(resp.data);
  } catch(err) {
    console.error("Error fetching Popular TV Shows: ", err.response?.data || err.message);
    res.status(500).json({ error: "Cannot load popular TV shows"});
  } 
});

// tv show - TOP RATED
app.get("/api/tv/tv-top-rated", async (req, res) => { 
  try{
    const resp = await axios.get(`${API}/tv/top_rated`, {
      params: { 
        api_key: process.env.TMDB_API_KEY, 
        language: 'en-US'
      },
    });
    res.json(resp.data);
  } catch(err) {
    console.error("Error fetching Top Rated TV Shows: ", err.response?.data || err.message);
    res.status(500).json({ error: "Cannot load Top Rated TV shows"});
  } 
});

//tv show - ON THE AIR
app.get("/api/tv/tv-on-the-air", async (req, res) => { 
  try{
    const resp = await axios.get(`${API}/tv/on_the_air`, {
      params: { 
        api_key: process.env.TMDB_API_KEY, 
        language: 'en-US'
      },
    });
    res.json(resp.data);
  } catch(err) {
    console.error("Error fetching On The Air TV Shows: ", err.response?.data || err.message);
    res.status(500).json({ error: "Cannot load On The Air TV shows"});
  } 
});

app.listen(5000, () => console.log("Server chạy tại http://localhost:5000"));
