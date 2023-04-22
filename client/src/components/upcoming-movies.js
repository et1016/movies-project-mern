import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Navigation, Scrollbar, A11y, FreeMode } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import MovieShow from "../components/modal";

const apiKey = process.env.REACT_APP_APIKEY;
const URL = "https://api.themoviedb.org/3/";
const imageURL = "https://image.tmdb.org/t/p/w500/";

const UpcomingMovies = (props) => {
  const { currentUser } = props;

  const navigate = useNavigate();

  const [upcomingMovies, setUpcomingMovies] = useState(null);

  useEffect(() => {
    const upcomingMoviesAPI = async () => {
      const dataFetch = await fetch(
        `${URL}movie/upcoming?api_key=${apiKey}&language=zh-TW`
      );
      let parsedData = await dataFetch.json();
      setUpcomingMovies(parsedData.results);
    };

    upcomingMoviesAPI();
  }, []);

  return (
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
  );
};

export default UpcomingMovies;
