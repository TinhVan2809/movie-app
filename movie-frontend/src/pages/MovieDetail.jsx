import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getMovieDetail, getMovieCredits } from '../api/movieApi';

export default function MovieDetail() {
  const { id } = useParams(); // Lấy id từ URL
  const [movie, setMovie] = useState(null);
  const [credits, setCredits] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDetails = async () => {
      setLoading(true);
      try {
        // Gọi song song API chi tiết phim và danh sách diễn viên
        const [movieRes, creditsRes] = await Promise.all([
          getMovieDetail(id),
          getMovieCredits(id)
        ]);
        setMovie(movieRes.data);
        setCredits(creditsRes.data);
      } catch (err) {
        console.error("Failed to fetch movie details or credits:", err);
        setError("Could not load movie details.");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchDetails();
    }
  }, [id]); // Chạy lại effect khi id thay đổi

  if (loading) return (
    <>
      
<div class="dot-spinner">
    <div class="dot-spinner__dot"></div>
    <div class="dot-spinner__dot"></div>
    <div class="dot-spinner__dot"></div>
    <div class="dot-spinner__dot"></div>
    <div class="dot-spinner__dot"></div>
    <div class="dot-spinner__dot"></div>
    <div class="dot-spinner__dot"></div>
    <div class="dot-spinner__dot"></div>
</div>
    </>
  );
  if (error) return <div>{error}</div>;
  if (!movie) return null;

  const imgUrl = "https://image.tmdb.org/t/p/w200";
  const placeholderImg = "https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-4-user-grey-d8fe957375e70239d6abdd549fd7568c89281b2179b5f4470e2e12895792dfa5.svg";

  return (
    <>
    <section className="movie-detail-container">
          {/* Sử dụng inline style để đặt ảnh nền động */}
          <div 
            className="backdrop" 
            style={{ 
              backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})` 
            }}
          >
          </div>
        <div className="detail-content">
            <div className="detail-content-l">
                <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
            </div>
            <div className="detail-content-r">
                <div className="head">
                    <div className="title">
                        <h3>{movie.title}</h3>
                        <span>({movie.release_date ? new Date(movie.release_date).getFullYear() : ''})</span>
                    </div>
                    <div className="genres">
                       <div className="genres-list">
                            <i class="ri-price-tag-3-fill"></i>
                            {movie.genres.map(genre => (
                                <span key={genre.id} className="genre-tag">{genre.name}</span>
                            ))}
                       </div>
                       <div className="location">
                             <i class="ri-map-pin-2-fill"></i>
                            {movie.origin_country.map(country => (
                                <span key={country.name}>{country}</span>
                            ))}
                       </div>
                        
                    </div>
                </div>
                 <div className="detail-btn">
                    <button>Play Trailer<i class="ri-play-reverse-large-fill"></i></button>
                    <button>Add To List<i class="ri-menu-add-line"></i></button>
                    <button>Watch List<i class="ri-play-list-2-fill"></i></button>
                    <button>Favorty<i class="ri-heart-fill"></i></button>
                </div>
                <div className="overview">
                    <p>Overview</p>
                    <p>{movie.overview}</p>
                </div>

                <hr />

                <div className="vote-container">
                    <p>{movie.vote_average}<i class="ri-star-fill"></i> / {movie.vote_count} <i class="ri-group-fill"></i></p>
                    <span>|</span>
                    <p><i class="ri-timer-2-line"></i> {movie.runtime}m</p>
                </div>
               
            </div>
        </div>
    </section>

        <div style={{ display: 'flex', overflowX: 'auto', gap: '16px', padding: '16px' }}>
                {credits?.cast.slice(0, 10).map((actor) => ( // Hiển thị 10 diễn viên đầu tiên
                <div key={actor.cast_id} style={{ textAlign: 'center', minWidth: '120px' }}>
                    <img 
                    src={actor.profile_path ? `${imgUrl}${actor.profile_path}` : placeholderImg} 
                    alt={actor.name} 
                    style={{ width: '100px', height: '150px', borderRadius: '8px', objectFit: 'cover' }} 
                    />
                    <p style={{ margin: '8px 0 0 0', fontWeight: 'bold' }}>{actor.name}</p>
                    <p style={{ margin: '4px 0 0 0', fontSize: '0.9em', color: '#666' }}>{actor.character}</p>
                </div>
                ))}
            </div>
   
    </>
  );
}