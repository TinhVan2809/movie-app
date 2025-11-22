const express = require("express");
const axios = require("axios");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());

const API = "https://api.themoviedb.org/3";

// Trending
app.get("/api/trending", async (req, res) => {
  try {
    const resp = await axios.get(`${API}/trending/movie/day`, {
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

app.listen(5000, () => console.log("Server chạy tại http://localhost:5000"));
