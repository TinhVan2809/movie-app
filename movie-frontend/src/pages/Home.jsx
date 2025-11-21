import { useEffect, useState } from "react";
import MovieCard from "../components/MovieCard";
import Slideshow from "../components/Slideshow";
import { getTrending, getPopular } from "../api/movieApi";

export default function Home() {
  const [trending, setTrending] = useState([]);
  const [popular, setPopular] = useState([]);

  useEffect(() => {
    getTrending().then((res) => setTrending(res.data?.results || []));
    getPopular().then((res) => setPopular(res.data?.results || []));
  }, []);

  const renderMovieCard = (movie) => <MovieCard key={movie.id} movie={movie} />;

  return (
    <div className="movie-container">
      <div className="movie-content slideShow">
        <div className="title">
          <h2>Trending Movies <i class="ri-arrow-right-wide-line"></i></h2>
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
          <h2>Popular Movies <i class="ri-arrow-right-wide-line"></i></h2>
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
    </div>
  );
}
