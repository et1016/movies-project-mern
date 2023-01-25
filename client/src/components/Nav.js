import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import movieLogo from "../Assets/logo.png";
import searchLogo from "../Assets/search.png";
import AuthService from "../services/auth.service";

const Nav = (props) => {
  const [navColour, updateNavbar] = useState(false);
  const [searchValue, setSearchValue] = useState(null);

  const { currentUser, setCurrentUser } = props;

  const navigate = useNavigate();

  const pathname = useLocation().pathname;
  // console.log(pathname);

  const scrollHandler = () => {
    if (window.scrollY >= 20) {
      updateNavbar(true);
    } else {
      updateNavbar(false);
    }
  };

  window.addEventListener("scroll", scrollHandler);

  const handleHomePage = () => {
    navigate("/");
    window.scrollTo(0, 0);
  };

  const handleInput = (e) => {
    setSearchValue(e.target.value);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchValue === null || searchValue === "") {
      navigate("/");
      window.scrollTo(0, 0);
    } else {
      navigate(`/search?query=${searchValue}`);
      // window.location.reload();
      window.scrollTo(0, 0);
    }
  };

  const handleFavourite = () => {
    if (currentUser) {
      navigate("/favourite");
      window.scrollTo(0, 0);
    } else {
      navigate("/login");
    }
  };

  const handleLogout = () => {
    setCurrentUser(AuthService.logout());
    navigate("/");
    window.location.reload();
    window.scrollTo(0, 0);
  };

  return (
    <nav className={navColour ? "sticky" : "nav"}>
      <img
        style={{ width: "10rem", cursor: "pointer" }}
        src={movieLogo}
        alt="movieLogo"
        onClick={handleHomePage}
      />

      {(pathname === "/" ||
        pathname === "/search" ||
        pathname === "/favourite") && (
        <div className="nav-search-movie">
          <form onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="搜尋電影 ..."
              onChange={handleInput}
            />
            <img src={searchLogo} onClick={handleSearch} alt="searchLogo" />
          </form>
        </div>
      )}

      <div className="nav-right">
        <div>
          <p onClick={handleFavourite}>♥</p>
        </div>

        {!currentUser && pathname !== "/login" && (
          <Link to="/login">
            <button>登入</button>
          </Link>
        )}

        {currentUser && <button onClick={handleLogout}>登出</button>}

        {!currentUser && pathname === "/login" && (
          <Link to="/register">
            <button>註冊</button>
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Nav;
