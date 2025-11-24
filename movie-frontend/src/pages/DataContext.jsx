import { createContext, useContext, useState, useEffect, useRef } from 'react';
import {
  getTrending, getPopular, getTopRated, getNowPlaying, getUpComing,
  getTvPopular, getTvTopRated, getTvAir,
  getTrailerNowPlaying, getTrailerTopRated, getTrailerPopular, getTrailerUpcoming
} from '../api/movieApi';

// 1. Tạo Context
const DataContext = createContext();

// 2. Tạo Provider component
export function DataProvider({ children }) {
  // State để lưu trữ dữ liệu
  const [trending, setTrending] = useState([]);
  const [popular, setPopular] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const [nowPlaying, setNowPlaying] = useState([]);
  const [upComing, setUpComing] = useState([]);

  const [tvPopular, setTvPopular] = useState([]);
  const [tvTopRated, setTvTopRated] = useState([]);
  const [tvAir, setTvAir] = useState([]);
  
  const [trailerNowPlaying, setTrailerNowPlaying] = useState([]);
  const [trailerPopular, setTrailerPopular] = useState([]);
  const [trailerTopRated, setTrailerTopRated] = useState([]);
  const [trailerUpcoming, setTrailerUpcoming] = useState([]);

  // Sử dụng useRef để đánh dấu xem dữ liệu đã được fetch lần đầu chưa
  // useRef sẽ giữ giá trị của nó qua các lần render mà không làm component render lại
  const isFetched = useRef(false);

  useEffect(() => {
    // Chỉ fetch dữ liệu nếu chưa được fetch trước đó
    if (!isFetched.current) {
      const fetchAllData = async () => {
        try {
          const [
            trendingRes, popularRes, topRatedRes, nowPlayingRes, upComingRes,
            tvPopularRes, tvTopRatedRes, tvAirRes,
            trailerNowPlayingRes, trailerPopularRes, trailerTopRatedRes, trailerUpcomingRes
          ] = await Promise.all([
            getTrending('day'), getPopular(), getTopRated(), getNowPlaying(), getUpComing(),
            getTvPopular(), getTvTopRated(), getTvAir(),
            getTrailerNowPlaying(), getTrailerPopular(), getTrailerTopRated(), getTrailerUpcoming()
          ]);

          // Cập nhật state với dữ liệu đã fetch
          setTrending(trendingRes.data?.results || []);
          setPopular(popularRes.data?.results || []);
          setTopRated(topRatedRes.data?.results || []);
          setNowPlaying(nowPlayingRes.data?.results || []);
          setUpComing(upComingRes.data?.results || []);
          setTvPopular(tvPopularRes.data?.results || []);
          setTvTopRated(tvTopRatedRes.data?.results || []);
          setTvAir(tvAirRes.data?.results || []);
          setTrailerNowPlaying(trailerNowPlayingRes.data || []);
          setTrailerPopular(trailerPopularRes.data || []);
          setTrailerTopRated(trailerTopRatedRes.data || []);
          setTrailerUpcoming(trailerUpcomingRes.data || []);

          // Đánh dấu là đã fetch thành công
          isFetched.current = true;
        } catch (error) {
          console.error("Failed to fetch initial data:", error);
        }
      };

      fetchAllData();
    }
  }, []); // Dependency array rỗng đảm bảo useEffect chỉ chạy một lần

  // Giá trị sẽ được cung cấp cho các component con
  const value = {
    trending, setTrending,
    popular, topRated, nowPlaying, upComing,
    tvPopular, tvTopRated, tvAir,
    trailerNowPlaying, trailerPopular, trailerTopRated, trailerUpcoming
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}

// 3. Tạo custom hook để sử dụng context dễ dàng hơn
export function useData() {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
}
