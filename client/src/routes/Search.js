import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import MovieShow from "../components/modal";
import FavouriteService from "../services/favourite.service";
import errorPicture from "../Assets/errorPicture.jpeg";

const Search = (props) => {
  const apiKey = process.env.REACT_APP_APIKEY;
  const URL = "https://api.themoviedb.org/3/";
  const imageURL = "https://image.tmdb.org/t/p/w500/";

  const [searchData, setSearchData] = useState("");
  const [favouriteSearchResult, setFavouriteSearchResult] = useState("");

  const { currentUser } = props;

  const navigate = useNavigate();

  function useQuery() {
    return new URLSearchParams(useLocation().search);
  }

  const query = useQuery().get("query");

  useEffect(() => {
    const searchMovieAPI = async () => {
      const dataFetch = await fetch(
        `${URL}search/movie?api_key=${apiKey}&language=zh-TW&query=${query}`
      );
      const parsedData = await dataFetch.json();
      setSearchData(parsedData.results);
    };
    searchMovieAPI();
  }, [query]);

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
  }, [currentUser]);

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
      <section
        className="search-card-background"
        style={
          searchData.length === 0 ? { height: "100vh" } : { height: "auto" }
        }
      >
        {searchData !== "" && searchData.length !== 0 && (
          <div className="queryKey">搜尋關鍵字為 " {query} "</div>
        )}

        {searchData !== "" && searchData.length === 0 && (
          <div className="error-handlar">
            <br />
            搜尋關鍵字為 " {query} "
            <br />
            <br />
            搜尋不到您要的資料，請重新輸入 . . .
          </div>
        )}

        <div className="movie-typography">
          {searchData &&
            searchData.map((data) => {
              const posterPathNull = errorPicture;
              return (
                <div className="movieImg-typography" key={data.id}>
                  <div className="search-imgContainer">
                    <MovieShow
                      posterPath={
                        data.poster_path !== null
                          ? imageURL + data.poster_path
                          : posterPathNull
                      }
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
              );
            })}
        </div>
      </section>
    </main>
  );
};

export default Search;
