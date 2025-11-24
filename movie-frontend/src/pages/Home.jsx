import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import MovieCard from "../components/MovieCard";
import Slideshow from "../components/Slideshow";
import { getTrending, getPopular, getTopRated, getNowPlaying, getUpComing } from "../api/movieApi";

import {getTvPopular, getTvTopRated, getTvAir} from "../api/movieApi";
import MoviesPoster from "../components/PosterMovies";
import TvShowPoster from "../components/PosterTvShows";

import { getTrailerNowPlaying, getTrailerTopRated, getTrailerPopular, getTrailerUpcoming } from "../api/movieApi";

export default function Home() {
  //MOVIES
  const [trending, setTrending] = useState([]);
  const [popular, setPopular] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const [nowPlaying, setNowPlaying] = useState([]);
  const [upComing, setUpComing] = useState([]);

  //TV SHOW
  const [tvPopular, setTvPopular] = useState([]);
  const [tvTopRated, setTvTopRated] = useState([]);
  const [tvAir, setTvAir] = useState([]);

  //Trailers
  const [trailerNowPlaying, setTrailerNowPlaying] = useState([]);
  const [trailerPopular, setTrailerPopular] = useState([]);
  const [trailerTopRated, setTrailerTopRated] = useState([]);
  const [trailerUpcoming, setTrailerUpcoming] = useState([]);

  const [trendingFilter, setTrendingFilter] = useState("Today");

  useEffect(() => {
    //MOVIES
    getTrending('day').then((res) => setTrending(res.data?.results || []));
    getPopular().then((res) => setPopular(res.data?.results || []));
    getTopRated().then((res) => setTopRated(res.data?.results || []));
    getNowPlaying().then((res) => setNowPlaying(res.data?.results || []));
    getUpComing().then((res) => setUpComing(res.data?.results || []));

    //TV SHOWS
    getTvPopular().then((res) => setTvPopular(res.data?.results || []));
    getTvTopRated().then((res) => setTvTopRated(res.data?.results || []));
    getTvAir().then((res) => setTvAir(res.data?.results || []));

    //TRAILERS
    getTrailerNowPlaying().then((res) => setTrailerNowPlaying(res.data || []));
    getTrailerPopular().then((res) => setTrailerPopular(res.data || []));
    getTrailerTopRated().then((res) => setTrailerTopRated(res.data || []));
    getTrailerUpcoming().then((res) => setTrailerUpcoming(res.data || []));

  }, []);

  useEffect(() => {
    const timeWindow = trendingFilter === 'Today' ? 'day' : 'week';
    getTrending(timeWindow).then((res) => setTrending(res.data?.results || []));
  }, [trendingFilter]);


//render movies card
  const renderMovieCard = (movie) => <MovieCard key={movie.id} movie={movie} />;

  const img = "https://image.tmdb.org/t/p/w300";
//filters for trending
  const filters = ["Today", "This Week"];

  return (
    
    <>
    {/* MOVIES */}
    
    <MoviesPoster m={upComing} />

    
    <div className="movie-container">
      <div className="movie-content slideShow">
        <div className="title">
          <h2>Trending Movies <i className="ri-arrow-right-wide-line"></i></h2>
          <div className="colunm-header">
            <ul>
              {filters.map((filter) => (
                <li
                  key={filter}
                  className={trendingFilter === filter ? "active" : ""}
                  onClick={() => setTrendingFilter(filter)}
                >
                  {filter}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <Slideshow
          items={trending}
          renderItem={renderMovieCard}
          itemsPerScreen={6}
        />
        <div className="movie-btn">
          <button className="btn-seeMore">See More</button>
          <button className="btn-ramdom">Ramdom Trending?</button>
        </div>
      </div>

      {/* TRAILER POPULAR */}
        <div className="trailer-lastest trailer-popular">
          <div className="trailer-title">
            <h2>Watch Trailers <i className="ri-arrow-right-wide-line"></i> Popular</h2>
          </div>
          <div className="trailers-container">
            {trailerPopular.slice(0, 10).map((trailer) => (
              <div className="trailer-card" key={trailer.movie_id}>
                <iframe
                  src={`https://www.youtube.com/embed/${trailer.trailer_key}`}
                  title={trailer.trailer_name}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
                <div className="trailer-card-title">
                  <p>{trailer.title}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      <div className="movie-content slideShow">
        <div className="title">
          <h2>Popular Movies <i className="ri-arrow-right-wide-line"></i></h2>
        </div>
        <Slideshow
          items={popular}
          renderItem={renderMovieCard}
          itemsPerScreen={6}
        />
        <div className="movie-btn">
          <button className="btn-seeMore">See More</button>
          <button className="btn-ramdom">Ramdom Popular?</button>
        </div>
      </div>

      {/* TRAILER TOP RATED */}
        <div className="trailer-lastest trailer-top-rated">
          <div className="trailer-title">
            <h2>Watch Trailers <i className="ri-arrow-right-wide-line"></i> Top Rated</h2>
          </div>
          <div className="trailers-container">
            {trailerTopRated.slice(0, 10).map((trailer) => (
              <div className="trailer-card" key={trailer.movie_id}>
                <iframe
                  src={`https://www.youtube.com/embed/${trailer.trailer_key}`}
                  title={trailer.trailer_name}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
                <div className="trailer-card-title">
                  <p>{trailer.title}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      <div className="movie-content slideShow">
        <div className="title">
          <h2>Top Rated Movies<i className="ri-arrow-right-wide-line"></i></h2>
        </div>
        <Slideshow
          items={topRated}
          renderItem={renderMovieCard}
          itemsPerScreen={6}
        />
        <div className="movie-btn">
          <button className="btn-seeMore">See More</button>
          <button className="btn-ramdom">Ramdom Top Rated?</button>
        </div>
      </div>

      {/* TRAILER NOW PLAYING */}
        <div className="trailer-lastest trailer-now-playing">
          <div className="trailer-title">
            <h2>Watch Trailers <i className="ri-arrow-right-wide-line"></i> Now Playing</h2>
          </div>
          <div className="trailers-container">
            {trailerNowPlaying.slice(0, 10).map((trailer) => (
              <div className="trailer-card" key={trailer.movie_id}>
                <iframe
                  src={`https://www.youtube.com/embed/${trailer.trailer_key}`}
                  title={trailer.trailer_name}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
                <div className="trailer-card-title">
                  <p>{trailer.title}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      <div className="movie-content slideShow">
        <div className="title">
          <h2>Now Playing Movies <i className="ri-arrow-right-wide-line"></i></h2>
        </div>
        <Slideshow
          items={nowPlaying}
          renderItem={renderMovieCard}
          itemsPerScreen={6}
        />
        <div className="movie-btn">
          <button className="btn-seeMore">See More</button>
          <button className="btn-ramdom">Ramdom Now Playing?</button>
        </div>
      </div>

      {/* TRAILER UPCOMING */}
        <div className="trailer-lastest trailer-up-coming">
          <div className="trailer-title">
            <h2>Watch Trailers <i className="ri-arrow-right-wide-line"></i> Upcoming</h2>
          </div>
          <div className="trailers-container">
            {trailerUpcoming.slice(0, 10).map((trailer) => (
              <div className="trailer-card" key={trailer.movie_id}>
                <iframe
                  src={`https://www.youtube.com/embed/${trailer.trailer_key}`}
                  title={trailer.trailer_name}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
                <div className="trailer-card-title">
                  <p>{trailer.title}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

       <div className="movie-content slideShow">
        <div className="title">
          <h2>Upcoming Movies <i className="ri-arrow-right-wide-line"></i></h2>
        </div>
        <Slideshow
          items={upComing}
          renderItem={renderMovieCard}
          itemsPerScreen={6}
        />
        <div className="movie-btn">
          <button className="btn-seeMore">See More</button>
          <button className="btn-ramdom">Ramdom Now Playing?</button>
        </div>
      </div>
    </div>

    {/* TV SHOWS */}
    <TvShowPoster />

    <div className="tvshow-container">
        <div className="tv-card">
          <div className="tv-header">
            <div className="title"><p>TV Shows Popular <i className="ri-arrow-right-wide-line"></i></p>
              <ul>
                <li>Lastes</li>
                <li>This Week</li>
                <li>2025</li>
              </ul>
            </div>
            <div className="tv-header-btn">
              <div className="btn">See More <button className="btn-submit"><i className="ri-arrow-right-s-line"></i></button></div>
              <div className="btn">Ramdom <button className="btn-submit"><i className="ri-arrow-right-s-line"></i></button></div>
            </div>
          </div>
          <div className="tv-card-content">
            {tvPopular.map((tv) => (
              <div className="card" key={tv.id}>
                        <img src={img + tv.poster_path} alt={tv.name} />
                    <div className="card-title">
                        <p>{tv.name}</p>
                    </div>
                    <div className="card-vote">
                        <span>{tv.vote_average} <i className="ri-star-fill"></i></span>
                    </div>
                </div>
        ))}
          </div>
        </div>

        <div className="tv-card">
          <div className="tv-header">
            <div className="title"><p>TV Shows Top Rated<i className="ri-arrow-right-wide-line"></i> </p>
              <ul>
                <li>Lastes</li>
                <li>This Week</li>
                <li>2025</li>
              </ul>
            </div>
            <div className="tv-header-btn">
              <div className="btn">See More <button className="btn-submit"><i className="ri-arrow-right-s-line"></i></button></div>
              <div className="btn">Ramdom <button className="btn-submit"><i className="ri-arrow-right-s-line"></i></button></div>
              
            </div>
          </div>
          <div className="tv-card-content">
            {tvTopRated.map((tv) => (
              <div className="card" key={tv.id}>
                        <img src={img + tv.poster_path} alt={tv.name} />
                    <div className="card-title">
                       <p>{tv.name}</p>
                    </div>
                    <div className="card-vote">
                        <span>{tv.vote_average} <i className="ri-star-fill"></i></span>
                    </div>
                </div>
        ))}
          </div>
        </div>

        <div className="tv-card">
          <div className="tv-header">
            <div className="title"><p>Now Playing <i className="ri-arrow-right-wide-line"></i></p>
              <ul>
                <li>Lastes</li>
                <li>This Week</li>
                <li>2025</li>
              </ul>
            </div>
            <div className="tv-header-btn">
              <div className="btn">See More <button className="btn-submit"><i className="ri-arrow-right-s-line"></i></button></div>
              <div className="btn">Ramdom <button className="btn-submit"><i className="ri-arrow-right-s-line"></i></button></div>
            </div>
          </div>
          <div className="tv-card-content">
            {tvAir.map((tv) => (
              <div className="card" key={tv.id}>
                        <img src={img + tv.poster_path} alt={tv.name} />
                    <div className="card-title">
                        <p>{tv.name}</p>
                    </div>
                    <div className="card-vote">
                       <span>{tv.vote_average}<i className="ri-star-fill"></i> </span>
                    </div>
                </div>
            ))}
              </div>
        </div>
    </div>

    </>
  );
}
