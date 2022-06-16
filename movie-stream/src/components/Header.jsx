import React from "react";
import navImage from "../assets/nav_bar.png";
import searchImage from "../assets/search.png";
import backButton from "../assets/Back.png";

const Header = ({ title }) => {
  return (
    <nav
      style={{ backgroundImage: `url(${navImage})` }}
      className="flex flex-wrap shadow-md p-2 mt-0 fixed w-full z-10 top-0"
    >
      <div className="flex-none mx-5">
        <img alt="search" src={backButton} className="h-6 w-6" />
      </div>
      <div className="flex-auto w-64 mx-2 flex-no-shrink text-white">
        <span className="font-Titillium text-xl tracking-tight">{title}</span>
      </div>
      <div className="flex-auto">
        <img alt="search" src={searchImage} className="h-6 w-6" />
      </div>
    </nav>
  );
};

export default Header;
