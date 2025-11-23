import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import './styles/Header.css'
import './styles/Home.css'
import './styles/index.css'
import './styles/Slideshow.css'
import './styles/MovieCard.css'
import './styles/Footer.css'
import './styles/Search.css'
import './styles/TvShowCard.css'

import Home from "./pages/Home";
import Search from "./pages/SearchResult";
import Header from "./components/Header";
import Footer from "./components/Footer";
import History from "./pages/History";
import About from "./pages/About";

export default function App() {
  return (
    <BrowserRouter>
     
     {/* NABAR */}
    <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route path="/history" element={<History />} />
        <Route path="/aboutUs" element={<About />} />
       </Routes>

      {/* FOOTER */}
      <Footer />
    </BrowserRouter>
  );
}
