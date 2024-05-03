import React, { useState, useEffect } from "react";
import "../styles/MainContent.css";
import bookmarkImg from "../images/bookmark.png";
import Popup from "./Popup";

const MainContent = () => {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [watchlists, setWatchlists] = useState([]);
  const [user, setUser] = useState(null);

  const handleClosePopup = (newWatchlistName, newWatchlistDescription) => {
    setShowPopup(false);
    if (selectedMovie) {
      const updatedUser = { ...user };
      const movieId = selectedMovie.imdbID;
  
      // Check if the selected watchlist exists
      if (updatedUser.watchlists && updatedUser.watchlists[newWatchlistName]) {
        // Add the movie to the existing watchlist
        updatedUser.watchlists[newWatchlistName].movies.push(movieId);
      } 
      setWatchlists(updatedUser.watchlists);
  
      setUser(updatedUser);
    }
  };
  
  const handleShowPopup = () => setShowPopup(true);

  // Fetch initial movies
  const fetchInitialMovies = async () => {
    try {
      const response = await fetch(
        "https://www.omdbapi.com/?s=batman&type=movie&page=1&apikey=dd3df0c"
      );
      const data = await response.json();
      if (data.Search) {
        setMovies(data.Search);
      }
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };



  // Fetch movies based on search term
  const fetchMovies = async (searchTerm) => {
    try {
      const response = await fetch(
        `https://www.omdbapi.com/?s=${searchTerm}&type=movie&page=1&apikey=dd3df0c`
      );
      const data = await response.json();
      if (data.Search) {
        setMovies(data.Search);
      }
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };

  // Handle search input change
  const handleInputChange = async (e) => {
    setSearchTerm(e.target.value);
  };

  // Handle movie click
  const handleMovieClick = async (movie) => {
    try {
      setSelectedMovie(movie);
      if(localStorage.getItem("user"))
        {
          handleShowPopup();
        }
        else{
          window.location.href = "login";
        }
    } catch (error) {
      console.error("Error fetching movie details:", error);
    }
  };
  
  useEffect(()=>{
    fetchInitialMovies();
  },[])
  
  return (
    <div className="col-sm-9 px-5 mt-5 main-content">
    <div className="hero-section">
      <div className="heading-big">
        Welcome to <span>Watchlists</span>
      </div>
      <div>
        Browse movies, add them to watchlists and share them to friends.
      </div>
      <div>
        Just click the{" "}
        <img
          width={25}
          className="boorkmark-image"
          src={bookmarkImg}
          alt=""
        />{" "}
        to add a movie, the poster to see more details or to mark the movie as
        watched.
      </div>
    </div>
    <form
      onSubmit={(e) => {
        e.preventDefault();
        fetchMovies(searchTerm);
      }}
      className="mb-4"
    >
     <div className="input-group my-4">
  <input
    type="text"
    className="form-control"
    placeholder="Search for movies..."
    value={searchTerm}
    onChange={handleInputChange}
  />
  <button
    className="btn btn-danger"
    type="button"
    id="button-search"
    onClick={() => fetchMovies(searchTerm)} // Here, the search function is called on button click
  >
    Search
  </button>
</div>

    </form>
    <div className="row">
      {movies.map((movie, index) => (
        <div key={index} className="col-md-2 mb-3">
          <div className="card">
            <button
              className="bookmark-btn"
              onClick={() => handleMovieClick(movie.imdbID, movie.Title)}
            >
              <img
                width={50}
                className="bookmark-img"
                src={bookmarkImg}
                alt="Bookmark"
              />
            </button>
            <img
              src={movie.Poster}
              className="card-img-top"
              alt={movie.Title}
            />
            <div className="card-body">
              <h5 className="card-title">{movie.Title}</h5>
              <p className="card-text">({movie.Year})</p>
              {movie.Ratings && movie.Ratings.map((rating, index) => (
              rating.Value !== null && (
                <p key={index} className="card-text">
                  {rating.Source}: {rating.Value}
                </p>
              )
            ))}
            </div>
          </div>
        </div>
      ))}
    </div>
    <Popup
      show={showPopup}
      handleClose={handleClosePopup}
      selectedMovie={selectedMovie}
    />
  </div>
  
  );
};

export default MainContent;
