import React, { useState } from "react";
import ReactDOM from "react-dom";
import { useNavigate } from "react-router-dom";
import FavouriteService from "../services/favourite.service";

const apiKey = process.env.REACT_APP_APIKEY;
const URL = "https://api.themoviedb.org/3/";

const MovieShow = (props) => {
  const {
    posterPath,
    title,
    originalTitle,
    overview,
    releaseDate,
    voteAverage,
    movie_id,
    currentUser,
  } = props;

  const navigate = useNavigate();

  const [showModal, setShowModal] = useState(false);
  const [parsedData, setParsedData] = useState([]);

  const handleShow = async () => {
    const dataFetch = await fetch(
      `${URL}movie/${movie_id}?api_key=${apiKey}&language=zh-TW`
    );
    const parsedData = await dataFetch.json();
    setParsedData(parsedData);
    setShowModal(true);
  };

  const handleHide = () => {
    setShowModal(false);
  };

  const favouriteHandlar = (e) => {
    if (currentUser) {
      const isLike = e.target.innerText === "♡";
      if (isLike) {
        FavouriteService.favourite(currentUser.user._id, e.target.className)
          .then((res) => {
            console.log(res);
          })
          .catch((err) => {
            console.log(err.response);
          });
        const getFavourite = document.getElementsByClassName(
          e.target.className
        );
        Array.from(getFavourite).forEach((data) => {
          data.innerText = "♥";
        });
      } else {
        FavouriteService.favouriteDelete(
          currentUser.user._id,
          e.target.className
        )
          .then((res) => {
            console.log(res);
          })
          .catch((err) => {
            console.log(err.response);
          });
        const getFavourite = document.getElementsByClassName(
          e.target.className
        );
        Array.from(getFavourite).forEach((data) => {
          data.innerText = "♡";
        });
      }
    } else {
      navigate("/login");
    }
  };

  return (
    <section>
      <div className="app">
        <img src={posterPath} alt="posterPath" onClick={handleShow} />

        <div className="favourite">
          <p className={movie_id} onClick={favouriteHandlar}>
            ♡
          </p>
        </div>
      </div>

      {showModal &&
        ReactDOM.createPortal(
          <div>
            <div className="modal" onClick={handleHide} />

            <div className="modal-container">
              <div
                className="modal-img"
                style={{ backgroundImage: `url(${posterPath})` }}
              />

              <div className="modal-details">
                <div className="modal-details-top">
                  <h1>{title}</h1>

                  <p className="modal-close-button" onClick={handleHide}>
                    ✕
                  </p>
                </div>

                <h3>{originalTitle}</h3>

                <div className="modal-movie-type">
                  {parsedData.genres.map((data) => (
                    <p key={data.id}>{data.name}</p>
                  ))}
                </div>

                <p>
                  片長：{Math.floor(parsedData.runtime / 60)} 小時{" "}
                  {Math.floor(parsedData.runtime % 60)} 分
                </p>

                <div className="modal-movie-p">
                  <p style={{ marginBottom: "2rem" }}>
                    上映日期：{releaseDate}．
                  </p>

                  <div className="modal-movie-p-evaluation">
                    <p style={{ marginRight: "0.5rem" }}>
                      評價分數：{voteAverage} / 10
                    </p>
                    <p>({parsedData.vote_count} 個評價)</p>
                  </div>
                </div>

                <p>概述：{overview}</p>
              </div>
            </div>
          </div>,
          document.getElementById("root")
        )}
    </section>
  );
};

export default MovieShow;
