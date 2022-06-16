import { useEffect, useCallback } from "react";
import { fetchMovies } from "../redux/features/sliceMovies";
import { useSelector, useDispatch } from "react-redux";

import debounce from "lodash/debounce";

const INTERSECTION_THRESHOLD = 5;
const LOAD_DELAY_MS = 50;

const useLazyLoad = ({ triggerRef, options }) => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  const { loadingStat, page, pageCount } = state;
  if (loadingStat === "idle") {
    dispatch(fetchMovies(1));
  }
  const _handleEntry = async (entry) => {
    const boundingRect = entry.boundingClientRect;
    const intersectionRect = entry.intersectionRect;

    if (
      page < pageCount &&
      entry.isIntersecting &&
      intersectionRect.bottom - boundingRect.bottom <= INTERSECTION_THRESHOLD
    ) {
      dispatch(fetchMovies(page + 1));
    }
  };
  const handleEntry = debounce(_handleEntry, LOAD_DELAY_MS);

  const onIntersect = useCallback(
    (entries) => {
      handleEntry(entries[0]);
    },
    [handleEntry]
  );

  useEffect(() => {
    if (triggerRef.current) {
      const container = triggerRef.current;
      const observer = new IntersectionObserver(onIntersect, options);

      observer.observe(container);

      return () => {
        observer.disconnect();
      };
    }
  }, [triggerRef, onIntersect, options]);
  return state;
};

export default useLazyLoad;
