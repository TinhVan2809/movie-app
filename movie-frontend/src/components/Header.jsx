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
            <NavLink to={'/'}><i class="ri-home-line"></i> Home</NavLink>
            <NavLink to={'/search'}><i class="ri-search-line"></i> Search</NavLink>
            <NavLink to={'/categories'}><i class="ri-bubble-chart-fill"></i> Categories <i class="ri-arrow-down-s-line"></i></NavLink>
            <NavLink to={'/history'}><i class="ri-timer-2-line"></i> History</NavLink>
            <NavLink to={'/aboutUs'}><i class="ri-group-line"></i> About us</NavLink>
        </div>
    </header>
</nav>
        </>
    )
}

export default Header;