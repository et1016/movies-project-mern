import React, { useState, useEffect } from "react";
import FavouriteService from "../services/favourite.service";
import MovieShow from "../components/modal";

const Favourite = (props) => {
  const [searchData, setSearchData] = useState([]);
  const [favouriteSearchResult, setFavouriteSearchResult] = useState("");

  const { currentUser } = props;

  const apiKey = process.env.REACT_APP_APIKEY;
  const URL = "https://api.themoviedb.org/3/";
  const imageURL = "https://image.tmdb.org/t/p/w500/";

  useEffect(() => {
    FavouriteService.favouriteSearch(currentUser.user._id)
      .then((res) => {
        setFavouriteSearchResult(res.data.favourite);
      })
      .catch((err) => {
        console.log(err.response);
      });
  }, []);

  useEffect(() => {
    const arrayParsedData = [];
    Array.from(favouriteSearchResult).forEach(async (movie_id) => {
      const dataFetch = await fetch(
        `${URL}movie/${movie_id}?api_key=${apiKey}&language=zh-TW`
      );
      const parsedData = await dataFetch.json();
      arrayParsedData.push(parsedData);
      if (arrayParsedData.length === favouriteSearchResult.length) {
        setSearchData(arrayParsedData);
      }
    });
  }, [favouriteSearchResult]);

  useEffect(() => {
    Array.from(favouriteSearchResult).forEach((data) => {
      setTimeout(() => {
        const getFavourite = document.getElementsByClassName(`${data}`);
        Array.from(getFavourite).forEach((data) => {
          data.innerText = "♥";
        });
      }, 900);
    });
  }, [searchData]);

  return (
    <main>
      <section
        className="favourite-background"
        style={
          searchData.length === 0 ? { height: "100vh" } : { height: "auto" }
        }
      >
        <div className="movie-typography">
          {searchData &&
            searchData.map((data) => {
              return (
                <div className="movieImg-typography" key={data.id}>
                  <div className="favourite-imgContainer">
                    <MovieShow
                      posterPath={imageURL + data.poster_path}
                      title={data.title}
                      originalTitle={data.original_title}
                      overview={data.overview}
                      releaseDate={data.release_date}
                      voteAverage={data.vote_average}
                      movie_id={data.id}
                      currentUser={currentUser}
                    />
                  </div>
                  <p>{data.title}</p>
                </div>
              );
            })}
        </div>
      </section>
    </main>
  );
};

export default Favourite;
