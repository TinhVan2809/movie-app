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
     console.log("Trending error:", err.response?.data);
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

// Get Movie Detail by ID
app.get("/api/movie/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const resp = await axios.get(`${API}/movie/${id}`, {
      params: { 
        api_key: process.env.TMDB_API_KEY,
        language: 'en-US'
      },
    });
    res.json(resp.data);
  } catch (err) {
    console.error("Error fetching movie details: ", err.response?.data || err.message);
    res.status(500).json({ error: "Cannot load movie details" });
  }
});

// Get Movie Credits by ID
app.get("/api/movie/:id/credits", async (req, res) => {
  try {
    const { id } = req.params;
    const resp = await axios.get(`${API}/movie/${id}/credits`, {
      params: { 
        api_key: process.env.TMDB_API_KEY,
        language: 'en-US'
      },
    });
    res.json(resp.data);
  } catch (err) {
    console.error("Error fetching movie credits: ", err.response?.data || err.message);
    res.status(500).json({ error: "Cannot load movie credits" });
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

// tv show - ON THE AIR

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



// Latest Trailers - nowplaying

app.get("/api/trailers/latest", async (req, res) => {

  try {

    // 1. Lấy danh sách phim đang chiếu

    const moviesResp = await axios.get(`${API}/movie/now_playing`, {

      params: { 

        api_key: process.env.TMDB_API_KEY,

        language: 'en-US'

      },

    });



    const movies = moviesResp.data.results;



    // 2. Tạo một mảng các promise để lấy video cho mỗi phim

    const videoPromises = movies.map(movie => 

      axios.get(`${API}/movie/${movie.id}/videos`, {

        params: { api_key: process.env.TMDB_API_KEY },

      })

    );



    // 3. Thực thi tất cả promise song song

    const videoResponses = await Promise.all(videoPromises);



    // 4. Lọc ra trailer và làm phẳng mảng kết quả

    const latestTrailers = videoResponses.flatMap(videoResp => {

      const movie = movies.find(m => m.id === videoResp.data.id);

      if (!movie) return [];



      const videos = videoResp.data.results;

      const trailer = videos.find(video => video.type === 'Trailer' && video.site === 'YouTube');

      

      return trailer ? [{

          movie_id: movie.id,

          title: movie.title,

          poster_path: movie.poster_path,

          trailer_key: trailer.key,

          trailer_name: trailer.name,

          published_at: trailer.published_at

      }] : [];

    });

    

    // Sắp xếp các trailer theo ngày xuất bản để lấy trailer mới nhất

    latestTrailers.sort((a, b) => new Date(b.published_at) - new Date(a.published_at));



    res.json(latestTrailers);



  } catch (err) {

    console.error("Error fetching latest trailers: ", err.response?.data || err.message);

    res.status(500).json({ error: "Cannot load latest trailers" });

  }

});


// Latest Trailers - popular

app.get("/api/trailers/latest-popular", async (req, res) => {

  try {

    // 1. Lấy danh sách phim đang chiếu

    const moviesResp = await axios.get(`${API}/movie/popular`, {

      params: { 

        api_key: process.env.TMDB_API_KEY,

        language: 'en-US'

      },

    });



    const movies = moviesResp.data.results;



    // 2. Tạo một mảng các promise để lấy video cho mỗi phim

    const videoPromises = movies.map(movie => 

      axios.get(`${API}/movie/${movie.id}/videos`, {

        params: { api_key: process.env.TMDB_API_KEY },

      })

    );



    // 3. Thực thi tất cả promise song song

    const videoResponses = await Promise.all(videoPromises);



    // 4. Lọc ra trailer và làm phẳng mảng kết quả

    const latestTrailers = videoResponses.flatMap(videoResp => {

      const movie = movies.find(m => m.id === videoResp.data.id);

      if (!movie) return [];



      const videos = videoResp.data.results;

      const trailer = videos.find(video => video.type === 'Trailer' && video.site === 'YouTube');

      

      return trailer ? [{

          movie_id: movie.id,

          title: movie.title,

          poster_path: movie.poster_path,

          trailer_key: trailer.key,

          trailer_name: trailer.name,

          published_at: trailer.published_at

      }] : [];

    });

    

    // Sắp xếp các trailer theo ngày xuất bản để lấy trailer mới nhất

    latestTrailers.sort((a, b) => new Date(b.published_at) - new Date(a.published_at));



    res.json(latestTrailers);



  } catch (err) {

    console.error("Error fetching latest trailers: ", err.response?.data || err.message);

    res.status(500).json({ error: "Cannot load latest trailers" });

  }

});


// Latest Trailers - Top_Rated

app.get("/api/trailers/latest-top-rated", async (req, res) => {

  try {

    // 1. Lấy danh sách phim đang chiếu

    const moviesResp = await axios.get(`${API}/movie/top_rated`, {

      params: { 

        api_key: process.env.TMDB_API_KEY,

        language: 'en-US'

      },

    });



    const movies = moviesResp.data.results;



    // 2. Tạo một mảng các promise để lấy video cho mỗi phim

    const videoPromises = movies.map(movie => 

      axios.get(`${API}/movie/${movie.id}/videos`, {

        params: { api_key: process.env.TMDB_API_KEY },

      })

    );



    // 3. Thực thi tất cả promise song song

    const videoResponses = await Promise.all(videoPromises);



    // 4. Lọc ra trailer và làm phẳng mảng kết quả

    const latestTrailers = videoResponses.flatMap(videoResp => {

      const movie = movies.find(m => m.id === videoResp.data.id);

      if (!movie) return [];



      const videos = videoResp.data.results;

      const trailer = videos.find(video => video.type === 'Trailer' && video.site === 'YouTube');

      

      return trailer ? [{

          movie_id: movie.id,

          title: movie.title,

          poster_path: movie.poster_path,

          trailer_key: trailer.key,

          trailer_name: trailer.name,

          published_at: trailer.published_at

      }] : [];

    });

    

    // Sắp xếp các trailer theo ngày xuất bản để lấy trailer mới nhất

    latestTrailers.sort((a, b) => new Date(b.published_at) - new Date(a.published_at));



    res.json(latestTrailers);



  } catch (err) {

    console.error("Error fetching latest trailers: ", err.response?.data || err.message);

    res.status(500).json({ error: "Cannot load latest trailers" });

  }

});


// Latest Trailers - Up-Coming

app.get("/api/trailers/latest-up-coming", async (req, res) => {

  try {

    // 1. Lấy danh sách phim đang chiếu

    const moviesResp = await axios.get(`${API}/movie/upcoming`, {

      params: { 

        api_key: process.env.TMDB_API_KEY,

        language: 'en-US'

      },

    });



    const movies = moviesResp.data.results;



    // 2. Tạo một mảng các promise để lấy video cho mỗi phim

    const videoPromises = movies.map(movie => 

      axios.get(`${API}/movie/${movie.id}/videos`, {

        params: { api_key: process.env.TMDB_API_KEY },

      })

    );



    // 3. Thực thi tất cả promise song song

    const videoResponses = await Promise.all(videoPromises);



    // 4. Lọc ra trailer và làm phẳng mảng kết quả

    const latestTrailers = videoResponses.flatMap(videoResp => {

      const movie = movies.find(m => m.id === videoResp.data.id);

      if (!movie) return [];



      const videos = videoResp.data.results;

      const trailer = videos.find(video => video.type === 'Trailer' && video.site === 'YouTube');

      

      return trailer ? [{

          movie_id: movie.id,

          title: movie.title,

          poster_path: movie.poster_path,

          trailer_key: trailer.key,

          trailer_name: trailer.name,

          published_at: trailer.published_at

      }] : [];

    });

    

    // Sắp xếp các trailer theo ngày xuất bản để lấy trailer mới nhất

    latestTrailers.sort((a, b) => new Date(b.published_at) - new Date(a.published_at));



    res.json(latestTrailers);



  } catch (err) {

    console.error("Error fetching latest trailers: ", err.response?.data || err.message);

    res.status(500).json({ error: "Cannot load latest trailers" });

  }

});





app.listen(5000, () => console.log("Server chạy tại http://localhost:5000"));
