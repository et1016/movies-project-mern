import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Navigation, Scrollbar, A11y, FreeMode } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import MovieShow from "../components/modal";

const apiKey = process.env.REACT_APP_APIKEY;
const URL = "https://api.themoviedb.org/3/";
const imageURL = "https://image.tmdb.org/t/p/w500/";

const PopularMovies = (props) => {
  const { currentUser } = props;

  const navigate = useNavigate();

  const [popularMovies, setPopularMovies] = useState(null);

  useEffect(() => {
    const popularMoviesAPI = async () => {
      const dataFetch = await fetch(
        `${URL}movie/popular?api_key=${apiKey}&language=zh-TW`
      );
      let parsedData = await dataFetch.json();
      setPopularMovies(parsedData.results);
    };

    popularMoviesAPI();
  }, []);

  return (
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
  );
};

export default PopularMovies;
