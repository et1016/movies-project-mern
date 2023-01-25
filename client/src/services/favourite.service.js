import axios from "axios";

const API_URL = "http://localhost:8080/api/favourite";

class FavouriteService {
  favourite(user_id, movie_id) {
    let token;
    if (localStorage.getItem("user")) {
      token = JSON.parse(localStorage.getItem("user")).token;
    } else {
      token = "";
    }
    return axios.post(
      API_URL + "/" + user_id,
      { movie_id },
      {
        headers: {
          Authorization: token,
        },
      }
    );
  }

  favouriteSearch(user_id) {
    let token;
    if (localStorage.getItem("user")) {
      token = JSON.parse(localStorage.getItem("user")).token;
    } else {
      token = "";
    }
    return axios.get(API_URL + "/search/" + user_id, {
      headers: {
        Authorization: token,
      },
    });
  }

  favouriteDelete(user_id, movie_id) {
    let token;
    if (localStorage.getItem("user")) {
      token = JSON.parse(localStorage.getItem("user")).token;
    } else {
      token = "";
    }
    return axios.post(
      API_URL + "/delete/" + user_id,
      { movie_id },
      {
        headers: {
          Authorization: token,
        },
      }
    );
  }
}

export default new FavouriteService();
