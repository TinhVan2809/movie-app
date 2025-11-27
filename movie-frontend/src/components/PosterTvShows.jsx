import { useNavigate } from "react-router-dom";

export default function TvShowPoster({tv}) {
    const navigate = useNavigate();
    const img = "https://image.tmdb.org/t/p/w300";
    return (
        <>
            <section className="bg-tvshow-container">
                <div className="bg-content">
                    <div className="left">
                        <header>
                            <div className="header-title">
                                <h3>TV SHOWS</h3>
                                <div className="links">
                                    <a href="javaScript:void(0)">Popular</a>
                                    <a href="javaScript:void(0)">Top Rated</a>
                                    <a href="javaScript:void(0)">Now Playing</a>
                                </div>
                            </div>
                            <div className="header-btn">
                                <button className="btn1">Lorem isum</button>
                                <button className="btn2">Lorem isum</button>
                            </div>
                            <div className="header-search">
                                <input type="text" placeholder="Search for..." />
                            </div>
                        </header>
                        <div className="left-bottom">
                            <div className="item">
                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iure, incidunt Lorem ipsum dolor sit amet consectetur, adipisicing elit. Saepe, dicta.</p>
                                <button>Submit</button>
                            </div>
                            <div className="item">
                                <p>Lorem ipsum dolor sit amet, consectetur adipisicing. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Deleniti Lorem ipsum dolor sit amet consectetur, adipisicing elit. Saepe, dicta.</p>
                                <button>Submit</button>
                            </div>
                        </div>
                    </div>
                    <div className="right">
                        <div className="list-shows-container">
                            {tv.map((t) => (
                                <div className="card" key={t.id} onClick={() => navigate(`/showDetail/${t.id}`)}>
                                    <img src={img + t.poster_path} alt={t.name} title={t.name} />
                                    <div className="title">
                                        <p>{t.name}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}