import React from "react";
import ReactDOM from "react-dom";
import FavouriteService from "../services/favourite.service";

const apiKey = process.env.REACT_APP_APIKEY;
const URL = "https://api.themoviedb.org/3/";

const modalRootEl = document.getElementById("root");

class Modal extends React.Component {
  constructor(props) {
    super(props);
    this.el = document.createElement("div");
  }

  componentDidMount() {
    modalRootEl.appendChild(this.el);
  }

  componentWillUnmount() {
    modalRootEl.removeChild(this.el);
  }

  render() {
    return ReactDOM.createPortal(this.props.children, this.el);
  }
}

class MovieShow extends React.Component {
  constructor(props) {
    super(props);
    this.state = { showModal: false, parsedData: "" };

    // this.handleShow = this.handleShow.bind(this);
    // this.handleHide = this.handleHide.bind(this);
  }

  handleShow = async () => {
    if (this.props.movie_id) {
      const movie_id = this.props.movie_id;
      const dataFetch = await fetch(
        `${URL}movie/${movie_id}?api_key=${apiKey}&language=zh-TW`
      );
      const parsedData = await dataFetch.json();
      this.setState({ showModal: true });
      this.setState({ parsedData: (this.state.parsedData = parsedData) });
    }
  };

  handleHide = () => {
    this.setState({ showModal: false });
  };

  favouriteHandlar = (e) => {
    if (this.props.currentUser) {
      const isLike = e.target.innerText === "♡";
      if (isLike) {
        FavouriteService.favourite(
          this.props.currentUser.user._id,
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
          data.innerText = "♥";
        });
      } else {
        FavouriteService.favouriteDelete(
          this.props.currentUser.user._id,
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
      const { navigate } = this.props;
      navigate("/login");
    }
  };

  render() {
    const modal = this.state.showModal ? (
      <Modal>
        <div onClick={this.handleHide} className="modal" />

        <div className="modal-container">
          <div
            className="modal-img"
            style={{ backgroundImage: `url(${this.props.posterPath})` }}
          />

          <div className="modal-details">
            <div className="modal-details-top">
              <h1>{this.props.title}</h1>

              <p className="modal-close-button" onClick={this.handleHide}>
                ✕
              </p>
            </div>

            <h3>{this.props.originalTitle}</h3>

            <div className="modal-movie-type">
              {this.state.parsedData !== "" &&
                this.state.parsedData.genres.map((data) => {
                  return <p key={data.id}>{data.name}</p>;
                })}
            </div>

            {this.state.parsedData !== "" && this.state.parsedData.runtime && (
              <div>
                <p style={{ marginBottom: "0.5rem" }}>
                  片長 : {Math.floor(this.state.parsedData.runtime / 60)} 小時{" "}
                  {Math.floor(this.state.parsedData.runtime % 60)} 分
                </p>
              </div>
            )}

            <div className="modal-movie-p">
              {this.state.parsedData !== "" &&
                !this.state.parsedData.last_air_date && (
                  <p style={{ marginBottom: "2rem" }}>
                    上映日期：{this.props.releaseDate}．
                  </p>
                )}

              <div className="modal-movie-p-evaluation">
                <p style={{ marginRight: "0.5rem" }}>
                  評價分數：{this.props.voteAverage} / 10
                </p>
                {this.state.parsedData !== "" && (
                  <p>({this.state.parsedData.vote_count} 個評價)</p>
                )}
              </div>
            </div>

            <p>概述：{this.props.overview}</p>
          </div>
        </div>
      </Modal>
    ) : null;
    return (
      <div className="app">
        <img
          src={this.props.posterPath}
          onClick={this.handleShow}
          alt="posterPath"
        />

        {modal}

        <div className="favourite">
          <p onClick={this.favouriteHandlar} className={this.props.movie_id}>
            ♡
          </p>
        </div>
      </div>
    );
  }
}

export default MovieShow;
