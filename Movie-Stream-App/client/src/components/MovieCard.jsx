import React from "react";
const API_URL = process.env.REACT_APP_API_URL || "http://localhost:8080";

const MovieCard = ({ name, imageUrl }) => {
  return (
    <div className="w-full rounded overflow-hidden shadow-lg m-2">
      <img
        className="w-full h-64 object-center"
        src={`${API_URL}/images/${imageUrl}`}
        alt={imageUrl}
      />
      <div className="px-6 py-4">
        <div className="font-Titillium text-xs text-white mb-2">{name}</div>
      </div>
    </div>
  );
};

export default MovieCard;
