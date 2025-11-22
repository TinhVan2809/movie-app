import { useEffect, useState } from "react";
import MovieCard from "../components/MovieCard";
import Slideshow from "../components/Slideshow";
import { getTrending, getPopular, getTopRated, getNowPlaying, getUpComing } from "../api/movieApi";

import {getTvPopular, getTvTopRated, getTvAir} from "../api/movieApi";

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

  }, []);

  useEffect(() => {
    const timeWindow = trendingFilter === 'Today' ? 'day' : 'week';
    getTrending(timeWindow).then((res) => setTrending(res.data?.results || []));
  }, [trendingFilter]);

  const renderMovieCard = (movie) => <MovieCard key={movie.id} movie={movie} />;
  const filters = ["Today", "This Week"];

  return (
    <>
    {/* MOVIES */}
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

      <div className="movie-content slideShow">
        <div className="title">
          <h2>Top Rated <i className="ri-arrow-right-wide-line"></i></h2>
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

      <div className="movie-content slideShow">
        <div className="title">
          <h2>Now Playing <i className="ri-arrow-right-wide-line"></i></h2>
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

       <div className="movie-content slideShow">
        <div className="title">
          <h2>Upcoming <i className="ri-arrow-right-wide-line"></i></h2>
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

    <div className="tvshow-container">
          
    </div>

    </>
  );
}
