import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Navigation, Scrollbar, A11y, FreeMode } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import MovieShow from "../components/modal";

const apiKey = process.env.REACT_APP_APIKEY;
const URL = "https://api.themoviedb.org/3/";
const imageURL = "https://image.tmdb.org/t/p/w500/";

const TopRatedMovies = (props) => {
  const { currentUser } = props;

  const navigate = useNavigate();

  const [topRatedMovies, setTopRatedMovies] = useState(null);

  useEffect(() => {
    const topRatedMoviesAPI = async () => {
      const dataFetch = await fetch(
        `${URL}movie/top_rated?api_key=${apiKey}&language=zh-TW`
      );
      let parsedData = await dataFetch.json();
      setTopRatedMovies(parsedData.results);
    };

    topRatedMoviesAPI();
  }, []);

  return (
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
  );
};

export default TopRatedMovies;
