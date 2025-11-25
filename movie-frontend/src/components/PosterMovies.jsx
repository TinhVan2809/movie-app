export default function MoviesPoster({m}) {
      const img = "https://image.tmdb.org/t/p/w300";
    return(
        <>
            <div className="poster-movies-container">
              
                 <div className="title">
                    <p>MOVIES</p>
                    <ul>
                        <li>Trending</li>
                        <li>Top Rated</li>
                        <li>Upcoming</li>
                        <li>Now Playing</li>
                    </ul>
                </div>
                <div className="search"> 
                    <div className="form__group field">
                        <input type="input" className="form__field" placeholder="Name" required="" />
                        <label htmlFor="name" className="form__label">Search for</label>
                        <button>Search</button>
                    </div>
                </div>
               
                <div className="header-list-movie">
                    <h3>What To Watch ToDay</h3>
                </div>
                
                <div className="list-movies">
                    {m.map((v) => (
                        <div className="card" key={v.id}>
                            <img src={img + v.poster_path} alt={v.title} />
                            <div className="card-title"><p>{v.title}</p></div>
                        </div>
                    ))}
                </div>
                <div className="poster-movies-button">
                    <p>Subscribe to the Premium plan to enjoy unlimited movies. </p>
                    <button><img src="/icons8-p-50.png"  />remium</button>
                </div>
                <div className="item">
                    <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi, harum.Lorem ipsum dolor sit amet, consectetur adipisicing elit. Exercitationem?</p>
                </div>
            </div>
        </>
    );
}