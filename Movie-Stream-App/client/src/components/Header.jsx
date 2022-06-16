import React, { useState } from "react";
import navImage from "../assets/nav_bar.png";
import searchImage from "../assets/search.png";
import backButton from "../assets/Back.png";
import { searchMovie, resetSearch } from "../redux/features/sliceMovies";
import { useDispatch } from "react-redux";

const Header = ({ title }) => {
  let [search, setSearch] = useState("");
  const dispatch = useDispatch();
  const fetchSearch = () => {
    if (search.length >= 4) dispatch(searchMovie(search));
    else alert("Please search with atleast 4 chrs");
  };
  return (
    <nav
      style={{ backgroundImage: `url(${navImage})` }}
      className="flex shadow-md p-2 mt-0 fixed w-full z-10 top-0"
    >
      <div className="flex-none">
        <img
          onClick={() => {
            setSearch("");
            dispatch(resetSearch());
          }}
          alt="search"
          src={backButton}
          className="h-6 w-6"
        />
      </div>
      <div className="flex-auto w-32 mx-2 flex-no-shrink text-white">
        <span className="font-Titillium text-xl tracking-tight">{title}</span>
      </div>
      <div className="flex-auto w-16">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          type="search"
          className="text-base w-full font-normal text-white bg-black bg-clip-padding border border-solid border-black rounded transition ease-in-out m-0 focus:text-white  focus:border-white focus:outline-none"
          placeholder="Search"
          aria-label="Search"
        />
      </div>
      <div className="flex-auto">
        <img
          onClick={fetchSearch}
          alt="search"
          src={searchImage}
          className="h-6 w-6"
        />
      </div>
    </nav>
  );
};

export default Header;
