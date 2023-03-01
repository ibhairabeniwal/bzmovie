import React, { useState, useEffect } from "react";
import { HiOutlineSearch } from "react-icons/hi";
import { SlMenu } from "react-icons/sl";
import { VscChromeClose } from "react-icons/vsc";
import { useNavigate, useLocation } from "react-router-dom";

import "./style.scss";

import ContentWrapper from "../contentWrapper/ContentWrapper";

const Header = () => {
  const [show, setShow] = useState("top");
  const [lastScrollY, setLastScrollY] = useState(0);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [query, setQuery] = useState("");
  const [showSearch, setShowSearch] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  const controlNavbar = () => {
    if (window.scrollY > 200) {
      if (window.scrollY > lastScrollY && !mobileMenu) {
        setShow("hide");
      } else {
        setShow("show");
      }
    } else {
      setShow("top");
    }
    setLastScrollY(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", controlNavbar);
    return () => {
      window.removeEventListener("scroll", controlNavbar);
    };
  }, [lastScrollY]);

  const searchQueryHandler = (event) => {
    if (event.key === "Enter" && query.length > 0) {
      navigate(`/search/${query}`);
      setTimeout(() => {
        setShowSearch(false);
      }, 1000);
    }
  };

  const openSearch = () => {
    setMobileMenu(false);
    setShowSearch(true);
  };

  const openMobileMenu = () => {
    setMobileMenu(true);
    setShowSearch(false);
  };

  const navigationHandler = (type) => {
    if (type === "movie") {
      navigate("/explore/movie");
    } else {
      navigate("/explore/tv");
    }
    setMobileMenu(false);
  };

  return (
    <header className={`header ${mobileMenu ? "mobileView" : ""} ${show}`}>
      <ContentWrapper>
        <div className="logo" onClick={() => navigate("/")}>
          <Logo />
        </div>
        <ul className="menuItems">
          <li className="menuItem" onClick={() => navigationHandler("movie")}>
            Movies
          </li>
          <li className="menuItem" onClick={() => navigationHandler("tv")}>
            TV Shows
          </li>
          <li className="menuItem">
            <HiOutlineSearch onClick={openSearch} />
          </li>
        </ul>

        <div className="mobileMenuItems">
          <HiOutlineSearch onClick={openSearch} />
          {mobileMenu ? (
            <VscChromeClose onClick={() => setMobileMenu(false)} />
          ) : (
            <SlMenu onClick={openMobileMenu} />
          )}
        </div>
      </ContentWrapper>
      {showSearch && (
        <div className="searchBar">
          <ContentWrapper>
            <div className="searchInput">
              <input
                type="text"
                placeholder="Search for a movie or tv show...."
                onChange={(e) => setQuery(e.target.value)}
                onKeyUp={searchQueryHandler}
              />
              <VscChromeClose onClick={() => setShowSearch(false)} />
            </div>
          </ContentWrapper>
        </div>
      )}
    </header>
  );
};

export default Header;
function Logo() {
  return (
    <svg
      version="1.2"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 276 72"
      width="138"
      height="36"
      fill="#fff"
    >
      <path d="m30.4 64.9c11.6 0 18.2-9.9 18.2-21.9 0-12.1-6.6-22-18.2-22-5 0-9 2-11.4 5.1v-19.5h-12.8v57.4h12.8v-4.2c2.4 3 6.4 5.1 11.4 5.1zm-11.5-23.1c0-6.4 3.4-9.9 8.2-9.9 5.6 0 8.6 4.6 8.6 11.1 0 6.4-3 11-8.6 11-4.8 0-8.2-3.6-8.2-9.9zm48.5-35.3h-12.8v57.4h12.8zm27.5 58.4c8.4 0 16.1-4.3 19.2-12.4l-10.7-3.4c-1.2 3.7-4.4 5.6-8.4 5.6-4.8 0-8.3-3.3-9.2-9h28.6v-3.4c0-11.9-7-21.4-19.8-21.4-12.1 0-21.1 9.5-21.1 22 0 13.1 8.7 22 21.4 22zm-0.4-34c4.7 0 7.2 3.2 7.3 6.9h-15.6c1.3-4.6 4.4-6.9 8.3-6.9zm48.5 33.1h14.1l-14.5-21.8 13.6-20.4h-13.6l-7.2 11.1-7.2-11.1h-14l13.6 20.4-14.5 21.8h13.6l8-12.3zm52.4-10.6h-19.5l19.3-22.3v-9.3h-35.5v10.6h19.9l-20.1 22.3v9.3h35.9zm24.8 11.4c8.4 0 16.1-4.2 19.2-12.3l-10.7-3.5c-1.2 3.7-4.4 5.6-8.4 5.6-4.8 0-8.3-3.2-9.2-9h28.6v-3.4c0-11.9-7-21.3-19.8-21.3-12.1 0-21.1 9.4-21.1 21.9 0 13.1 8.7 22 21.4 22zm-0.4-34c4.7 0 7.2 3.2 7.3 7h-15.6c1.3-4.7 4.4-7 8.3-7zm27.2 21.8c0 8.7 4.5 11.7 13.7 11.7 3 0 5.4-0.2 7.6-0.5v-10.5c-1.4 0.1-2.1 0.2-3.6 0.2-3.2 0-5.1-0.6-5.1-4.1v-17.1h8.3v-10.5h-8.3v-11.7h-12.6v11.7h-5.4v10.5h5.4z" />
      <path
        fill="#da2f68"
        d="m135.5 21c-4.1 0-7.5-3.4-7.5-7.5 0-4.1 3.4-7.5 7.5-7.5 4.1 0 7.5 3.4 7.5 7.5 0 4.1-3.4 7.5-7.5 7.5z"
      />
    </svg>
  );
}
