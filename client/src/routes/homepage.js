import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Typewriter from "typewriter-effect";
import FavouriteService from "../services/favourite.service";
import PopularMovies from "../components/popular-movies";
import UpcomingMovies from "../components/upcoming-movies";
import TrendingMovies from "../components/trending-movies";
import TopRatedMovies from "../components/topRated-movies";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/scrollbar";
import "swiper/css/free-mode";

const Homepage = (props) => {
  const { currentUser } = props;

  const [favouriteSearchResult, setFavouriteSearchResult] = useState("");

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
        <PopularMovies />
        <TrendingMovies />
        <TopRatedMovies />
        <UpcomingMovies />
      </div>
    </main>
  );
};

export default Homepage;
