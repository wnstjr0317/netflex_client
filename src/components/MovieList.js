import React, { useEffect, useState, Fragment } from "react";
import { Link, withRouter } from "react-router-dom";
import MovieListEntry from "./MovieListEntry";
import { apiUrl, apiKey, imageBaseUrl } from "./config";
import axios from "axios";
import PropTypes from "prop-types";
import MovieInfo from "./MovieInfo";
import "./MovieList.css";

function MovieList({
  isLogin,
  userInfo,
  handleWriteReview,
  hadleReviewChangeByTitle,
}) {
  const [Movies, setMovies] = useState();
  const [ModalData, setModalData] = useState({});
  const [modal, setModal] = useState(false);

  const showModal = (movie) => {
    setModalData(movie);
    setModal(true);
  };
  const closeModal = () => {
    setModal(false);
  };

  const modalCont = (
    <MovieInfo
      movieId={ModalData.id}
      containerName={"modalContainer" + (modal ? "show" : "hide")}
      movieName={ModalData.original_title}
      overview={ModalData.overview}
      show={modal}
      img={ModalData.poster_path}
      release={ModalData.release_date}
      onClick={() => closeModal()}
      adult={ModalData.adult}
      handleWriteReview={handleWriteReview}
      hadleReviewChangeByTitle={hadleReviewChangeByTitle}
      userInfo={userInfo}
    />
  );

  useEffect(() => {
    const endpoint = `${apiUrl}movie/popular?api_key=${apiKey}&language=ko-KR&page=1`;
    axios.get(endpoint, {}).then((res) => {
      setMovies(res.data.results);
    });
  }, []);


  if (isLogin) {
    return (
      <Fragment>
        <>
          {modalCont}
          <div className="movielist">
            {Movies &&
              Movies.map((movie, index) => (
                <React.Fragment key={index}>
                  <div onClick={() => showModal(movie)}>
                    <MovieListEntry
                      image={
                        movie.poster_path
                          ? `${imageBaseUrl}w500${movie.poster_path}`
                          : null
                      }
                      movieId={movie.id}
                      movieName={movie.original_title}
                    />
                  </div>
                </React.Fragment>
              ))}
          </div>
        </>
      </Fragment>
    );
  } else {
    return <div></div>;
  }
}
MovieList.propTypes = {
  isLogin: PropTypes.bool,
  userInfo: PropTypes.object,
  handleWriteReview: PropTypes.func,
};
export default withRouter(MovieList);

