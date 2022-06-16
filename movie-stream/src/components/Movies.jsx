import React from "react";
import { useRef } from "react";
import useLazyLoad from "../hooks/useLazyLoad";
import clsx from "clsx";
import { LoadingPosts } from "./LoadingMovies";
import MovieCard from "./MovieCard";
import Header from "./Header";

const Movies = () => {
  const triggerRef = useRef(null);
  const state = useLazyLoad({ triggerRef });
  const loading = state.loadingStat === "pending" ? true : false;
  return (
    <>
      <Header title={state.title} />
      <div className="grid grid-cols-3 gap-4 content-start">
        {state.movies.map((movie) => {
          return (
            <MovieCard
              key={movie.id}
              name={movie.name}
              imageUrl={movie.poster_image}
            />
          );
        })}
      </div>
      <div ref={triggerRef} className={clsx("trigger", { visible: loading })}>
        <LoadingPosts isPageEnd={state.page < state.pageCount ? false : true} />
      </div>
    </>
  );
};

export default Movies;
