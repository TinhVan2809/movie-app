import { useState } from "react";
import { searchMovie } from "../api/movieApi";
import MovieCard from "../components/MovieCard";

export default function Search() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
    const res = await searchMovie(query);
    setResults(res.data.results);
  };

  return (
    <>
      <div className="search-input">
          <input
          type="text"
          placeholder="Search for a movie..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      <div className="result">
        <div className="grid-result">
        {results.map((m) => (
          <MovieCard key={m.id} movie={m} />
        ))}
      </div>
      </div>
    </>
  );
}
