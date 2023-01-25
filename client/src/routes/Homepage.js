import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Typewriter from "typewriter-effect";
import { Navigation, Scrollbar, A11y, FreeMode } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import MovieShow from "../components/Modal";
import FavouriteService from "../services/favourite.service";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/scrollbar";
import "swiper/css/free-mode";

const Homepage = (props) => {
  const [popularMovies, setPopularMovies] = useState(null);
  const [upcomingMovies, setUpcomingMovies] = useState(null);
  const [topRatedMovies, setTopRatedMovies] = useState(null);
  const [trendingMovies, setTrendingMovies] = useState(null);
  const [favouriteSearchResult, setFavouriteSearchResult] = useState("");

  const { currentUser } = props;

  const navigate = useNavigate();

  const apiKey = process.env.REACT_APP_APIKEY;
  const URL = "https://api.themoviedb.org/3/";
  const imageURL = "https://image.tmdb.org/t/p/w500/";

  // movie/popular 熱門電影
  // movie/upcoming 即將上映
  // movie/top_rated 高評價
  // trending/movie/week 本週熱門
  const popularMoviesAPI = async () => {
    const dataFetch = await fetch(
      `${URL}movie/popular?api_key=${apiKey}&language=zh-TW`
    );
    let parsedData = await dataFetch.json();
    setPopularMovies(parsedData.results);
  };

  const upcomingMoviesAPI = async () => {
    const dataFetch = await fetch(
      `${URL}movie/upcoming?api_key=${apiKey}&language=zh-TW`
    );
    let parsedData = await dataFetch.json();
    setUpcomingMovies(parsedData.results);
  };

  const topRatedMoviesAPI = async () => {
    const dataFetch = await fetch(
      `${URL}movie/top_rated?api_key=${apiKey}&language=zh-TW`
    );
    let parsedData = await dataFetch.json();
    setTopRatedMovies(parsedData.results);
  };

  const trendingMoviesAPI = async () => {
    const dataFetch = await fetch(
      `${URL}trending/movie/week?api_key=${apiKey}&language=zh-TW`
    );
    let parsedData = await dataFetch.json();
    setTrendingMovies(parsedData.results);
  };

  useEffect(() => {
    popularMoviesAPI();
    upcomingMoviesAPI();
    topRatedMoviesAPI();
    trendingMoviesAPI();
  }, []);

  useEffect(() => {
    if (currentUser !== null) {
      FavouriteService.favouriteSearch(currentUser.user._id)
        .then((res) => {
          setFavouriteSearchResult(res.data.favourite);
        })
        .catch((err) => {
          console.log(err.response);
        });
    }
  }, []);

  useEffect(() => {
    Array.from(favouriteSearchResult).forEach((data) => {
      setTimeout(() => {
        const getFavourite = document.getElementsByClassName(`${data}`);
        Array.from(getFavourite).forEach((data) => {
          data.innerText = "♥";
        });
      }, 900);
    });
  }, [favouriteSearchResult]);

  return (
    <main>
      <section className="card-background">
        <div className="filter"></div>
        <div className="card-text">
          {currentUser && (
            <h2 style={{ color: "red" }}>
              {currentUser.user.username}，歡迎回來。
            </h2>
          )}
          <Typewriter
            options={{
              strings: ["集聚強檔電影與節目，還有更多精彩內容"],
              autoStart: true,
              loop: true,
              deleteSpeed: 50,
            }}
          />
          <br></br>
          <p>隨處都能觀賞，可隨時取消。</p>
          <br></br>
          {!currentUser && (
            <h3>
              準備開心觀賞了嗎？請按下開始使用，以建立或重新啟用您的帳戶。
            </h3>
          )}
          <br></br>
          {!currentUser && (
            <Link to="/register">
              <button className="start">開始使用</button>
            </Link>
          )}
        </div>
      </section>

      <div className="card-movie">
        <div className="card-movie-container">
          <h2>熱門電影</h2>
          <div className="swiper-container">
            <div className="swiper-button-prev popular-movies-prev"></div>
            <div className="swiper-button-next popular-movies-next"></div>
            <Swiper
              modules={[Navigation, Scrollbar, A11y, FreeMode]}
              spaceBetween={20}
              slidesPerView={"auto"}
              navigation={{
                prevEl: ".popular-movies-prev",
                nextEl: ".popular-movies-next",
              }}
              scrollbar={{ draggable: true }}
              freeMode={true}
            >
              {popularMovies &&
                popularMovies.map((data) => {
                  return (
                    <SwiperSlide style={{ width: "min-content" }} key={data.id}>
                      <div className="movie-typography">
                        <div className="imgContainer">
                          <MovieShow
                            posterPath={imageURL + data.poster_path}
                            title={data.title}
                            originalTitle={data.original_title}
                            overview={data.overview}
                            releaseDate={data.release_date}
                            voteAverage={data.vote_average}
                            movie_id={data.id}
                            currentUser={currentUser}
                            navigate={navigate}
                          />
                        </div>
                        <p>{data.title}</p>
                      </div>
                    </SwiperSlide>
                  );
                })}
            </Swiper>
          </div>
        </div>

        <br />
        <br />

        <div className="card-movie-container">
          <h2>即將上映</h2>
          <div className="swiper-container">
            <div className="swiper-button-prev coming-soon-prev"></div>
            <div className="swiper-button-next coming-soon-next"></div>
            <Swiper
              modules={[Navigation, Scrollbar, A11y, FreeMode]}
              spaceBetween={20}
              slidesPerView={"auto"}
              navigation={{
                prevEl: ".coming-soon-prev",
                nextEl: ".coming-soon-next",
              }}
              scrollbar={{ draggable: true }}
              freeMode={true}
            >
              {upcomingMovies &&
                upcomingMovies.map((data) => {
                  return (
                    <SwiperSlide style={{ width: "min-content" }} key={data.id}>
                      <div className="movie-typography">
                        <div className="imgContainer">
                          <MovieShow
                            posterPath={imageURL + data.poster_path}
                            title={data.title}
                            originalTitle={data.original_title}
                            overview={data.overview}
                            releaseDate={data.release_date}
                            voteAverage={data.vote_average}
                            movie_id={data.id}
                            currentUser={currentUser}
                            navigate={navigate}
                          />
                        </div>
                        <p>{data.title}</p>
                      </div>
                    </SwiperSlide>
                  );
                })}
            </Swiper>
          </div>
        </div>
      </div>

      <div className="card-movie-two">
        <div className="card-movie-container">
          <h2>本週熱門</h2>
          <div className="swiper-container">
            <div className="swiper-button-prev popular-this-week-prev"></div>
            <div className="swiper-button-next popular-this-week-next"></div>
            <Swiper
              modules={[Navigation, Scrollbar, A11y, FreeMode]}
              spaceBetween={20}
              slidesPerView={"auto"}
              navigation={{
                prevEl: ".popular-this-week-prev",
                nextEl: ".popular-this-week-next",
              }}
              scrollbar={{ draggable: true }}
              freeMode={true}
            >
              {trendingMovies &&
                trendingMovies.map((data) => {
                  return (
                    <SwiperSlide style={{ width: "min-content" }} key={data.id}>
                      <div className="movie-typography">
                        <div className="imgContainer">
                          <MovieShow
                            posterPath={imageURL + data.poster_path}
                            title={data.title}
                            originalTitle={data.original_title}
                            overview={data.overview}
                            releaseDate={data.release_date}
                            voteAverage={data.vote_average}
                            movie_id={data.id}
                            currentUser={currentUser}
                            navigate={navigate}
                          />
                        </div>
                        <p>{data.title}</p>
                      </div>
                    </SwiperSlide>
                  );
                })}
            </Swiper>
          </div>
        </div>

        <br />
        <br />

        <div className="card-movie-container">
          <h2>最高評價</h2>
          <div className="swiper-container">
            <div className="swiper-button-prev highest-rating-prev"></div>
            <div className="swiper-button-next highest-rating-next"></div>
            <Swiper
              modules={[Navigation, Scrollbar, A11y, FreeMode]}
              spaceBetween={20}
              slidesPerView={"auto"}
              navigation={{
                prevEl: ".highest-rating-prev",
                nextEl: ".highest-rating-next",
              }}
              scrollbar={{ draggable: true }}
              freeMode={true}
            >
              {topRatedMovies &&
                topRatedMovies.map((data) => {
                  return (
                    <SwiperSlide style={{ width: "min-content" }} key={data.id}>
                      <div className="movie-typography">
                        <div className="imgContainer">
                          <MovieShow
                            posterPath={imageURL + data.poster_path}
                            title={data.title}
                            originalTitle={data.original_title}
                            overview={data.overview}
                            releaseDate={data.release_date}
                            voteAverage={data.vote_average}
                            movie_id={data.id}
                            currentUser={currentUser}
                            navigate={navigate}
                          />
                        </div>
                        <p>{data.title}</p>
                      </div>
                    </SwiperSlide>
                  );
                })}
            </Swiper>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Homepage;
