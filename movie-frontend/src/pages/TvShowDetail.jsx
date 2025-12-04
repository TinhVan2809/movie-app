import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getTvShowDetail, getTvShowCredits, getTvShowVideos } from '../api/movieApi';
export default function TvShowDetail() {
    const { id } = useParams(); // Lấy id từ URL
    const [tvShow, setTvShow] = useState(null);
    const [creditsTvShow, setCreditsTvShow] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showTrailer, setShowTrailer] = useState(false);
    const [trailerKey, setTrailerKey] = useState(null);
    // const [session, setSession] = useState([]);

    const img = "https://image.tmdb.org/t/p/w500/";

    useEffect(() => {
    const fetchDetails = async () => {
      setLoading(true);
      try {
        // Gọi song song API chi tiết phim và danh sách diễn viên
        const [tvShowRes, creditsRes] = await Promise.all([
          getTvShowDetail(id),
          getTvShowCredits(id)
        ]);
        setTvShow(tvShowRes.data);
        setCreditsTvShow(creditsRes.data);
      } catch (err) {
        console.error("Failed to fetch tv show details or credits:", err);
        setError("Could not load tv show details.");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchDetails();
    }
  }, [id]); // Chạy lại effect khi id thay đổi

  const handlePlayTrailer = async () => {
    try {
      const res = await getTvShowVideos(id);
      const videos = res.data.results;
      // Tìm video là 'Trailer' và từ 'YouTube'
      const officialTrailer = videos.find(video => video.type === 'Trailer' && video.site === 'YouTube');
      if (officialTrailer) {
        setTrailerKey(officialTrailer.key);
        setShowTrailer(true);
      } else {
        alert('Trailer not available for this TV show.');
      }
    } catch (error) {
      console.error('Failed to fetch trailer:', error);
      alert('Could not load trailer.');
    }
  };

    if (loading) return (
    <>
      
<div className="dot-spinner">
    <div className="dot-spinner__dot"></div>
    <div className="dot-spinner__dot"></div>
    <div className="dot-spinner__dot"></div>
    <div className="dot-spinner__dot"></div>
    <div className="dot-spinner__dot"></div>
    <div className="dot-spinner__dot"></div>
    <div className="dot-spinner__dot"></div>
    <div className="dot-spinner__dot"></div>
</div>
    </>
  );
  if (error) return <div>{error}</div>;
  if (!tvShow) return null;

  const imgUrl = "https://image.tmdb.org/t/p/w200";
  const placeholderImg = "https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-4-user-grey-d8fe957375e70239d6abdd549fd7568c89281b2179b5f4470e2e12895792dfa5.svg";

  return (
    <>
    <section className="movie-detail-container" key={tvShow.id}>
          {/* Sử dụng inline style để đặt ảnh nền động */}
          <div 
            className="backdrop" 
            style={{ 
              backgroundImage: `url(https://image.tmdb.org/t/p/original${tvShow.backdrop_path})` 
            }}
          >
          </div>
        <div className="detail-content">
            <div className="detail-content-l">
                <img src={`https://image.tmdb.org/t/p/w500${tvShow.poster_path}`} alt={tvShow.name} />
            </div>
            <div className="detail-content-r">
                <div className="head">
                    <div className="title">
                        <h3>{tvShow.name}</h3>
                        <span>({tvShow.first_air_date ? new Date(tvShow.first_air_date).getFullYear() : ''})</span>
                    </div>
                    <div className="genres">
                       <div className="genres-list">
                            <i className="ri-price-tag-3-fill"></i>
                            {tvShow.genres.map(genre => (
                                <span key={genre.id} className="genre-tag">{genre.name}</span>
                            ))}
                       </div>
                       <div className="location">
                             <i className="ri-map-pin-2-fill"></i>
                            {tvShow.origin_country.map(country => (
                                // Thêm key duy nhất cho mỗi phần tử trong danh sách
                                <span key={country}>{country}</span>
                            ))}
                       </div>
                        
                    </div>
                </div>
                 <div className="detail-btn">
                    <button onClick={handlePlayTrailer}>Play Trailer<i className="ri-play-reverse-large-fill"></i></button>
                    <button>Add To List<i className="ri-menu-add-line"></i></button>
                    <button>Watch List<i className="ri-play-list-2-fill"></i></button>
                    <button>Favorty<i className="ri-heart-fill"></i></button>
                </div>
                <div className="session">
                  <div className="session-content">
                    {tvShow.seasons.map((s)=> (
                       <button><p>{s.name}</p></button>
                  ))}
                  </div>
                </div>
                <div className="overview">
                    <p>Overview</p>
                    <p>{tvShow.overview}</p>
                </div>

                <hr />

                <div className="vote-container">
                    <p>{tvShow.vote_average}<i className="ri-star-fill"></i> / {tvShow.vote_count} <i className="ri-group-fill"></i></p>
                    <span>|</span>
                    <p><i className="ri-timer-2-line"></i> {tvShow.episode_run_time[0]}m</p>
                </div>
               
            </div>
        </div>
    </section>

          {showTrailer && (
            <div className="trailer-modal">
                <div className="trailer-modal-content">
                    <button className="close-btn" onClick={() => setShowTrailer(false)}>
                        <i class="ri-close-line"></i>
                    </button>
                    <iframe
                        src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1`}
                        title="YouTube video player"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    ></iframe>
                </div>
            </div>
        )}

        <div className='cast'>
                {creditsTvShow?.cast.slice(0, 15).map((actor) => ( // Hiển thị 15 diễn viên đầu tiên
                <div key={actor.cast_id} className='cast-card'>
                    <img 
                    src={actor.profile_path ? `${imgUrl}${actor.profile_path}` : placeholderImg} 
                    alt={actor.name} 
                    />
                    <p className='name'>{actor.name}</p>
                    <p className='character'>{actor.character}</p>
                </div>
                ))}
        </div>

      <div className="infomation">
            <h3>Created By</h3>
          <div className="created-by">
                {tvShow.created_by.map((c) => (
                  <div className="card">
                    <img src={img + c.profile_path} />
                    <p>{c.name}</p>
                  </div>
                ))}
          </div>

      </div>

  
    </>
  );
}