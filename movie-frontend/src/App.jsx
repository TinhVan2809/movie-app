import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

import './styles/Header.css'
import './styles/Home.css'
import './styles/index.css'
import './styles/Slideshow.css'
import './styles/MovieCard.css'
import './styles/Footer.css'

import Home from "./pages/Home";
import Search from "./pages/SearchResult";
import Header from "./components/Header";
import Footer from "./components/Footer";

export default function App() {
  return (
    <BrowserRouter>
     
     {/* NABAR */}
    <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Search />} />
      </Routes>

      {/* FOOTER */}
      <Footer />
    </BrowserRouter>
  );
}
