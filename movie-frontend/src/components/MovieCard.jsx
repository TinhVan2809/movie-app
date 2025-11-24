import { Routes, Route, NavLink, useNavigate } from 'react-router-dom';

export default function MovieCard({ movie }) {
  const navigate = useNavigate();
  const img = "https://image.tmdb.org/t/p/w300";

  return (
    <div className="movie-card" onClick={() => navigate(`/movieDetail/${movie.id}`)}> 
      <img src={img + movie.poster_path} alt={movie.title} title={movie.title} />
      <div className="movie-card-title">
        <h3>{movie.title}</h3>
      </div>
      <div className="movie-card-vote">
        <p> {movie.vote_average}<i className="ri-star-fill"></i></p>
      </div>
    </div>
  );
}
