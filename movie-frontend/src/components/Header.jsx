import { NavLink } from "react-router-dom";

function Header() {
    return (
        <>
            
<nav className="nav-container">
    <header className="nav-header">
        <div className="logo">
            <img src="/Adora-removebg-preview.png" />
        </div>
        <div className="links">
            <NavLink to={'/'}><i className="ri-home-line"></i> Home</NavLink>
            <NavLink to={'/filter'}><i className="ri-filter-3-line"></i> Filter <i className="ri-arrow-down-s-line"></i></NavLink>
            <NavLink to={'/search'}><i className="ri-search-line"></i> Search</NavLink>
            <NavLink to={'/categories'}><i className="ri-bubble-chart-fill"></i> Categories <i className="ri-arrow-down-s-line"></i></NavLink>
            <NavLink to={'/history'}><i className="ri-timer-2-line"></i> History</NavLink>
            <NavLink to={'/aboutUs'}><i className="ri-group-line"></i> About us</NavLink>
        </div>
    </header>
</nav>
        </>
    )
}

export default Header;