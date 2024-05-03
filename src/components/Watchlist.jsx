import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Navbar from "../components/Navbar"
import yetToWatch from "../images/yet-to-watch.png";
import watched from "../images/watched.png";
import "../styles/Watchlist.css"
const Watchlist = () => {
  const [movies, setMovies] = useState([]);
  const [listName, setListName] = useState("");
  const [description, setDescription] = useState("");
  const [showEditModal, setShowEditModal] = useState(false);
  const [watchedMovies, setWatchedMovies] = useState([]);
  const { listName: listParam } = useParams();

  useEffect(() => {
    const fetchMovies = async () => {
      const user = JSON.parse(localStorage.getItem("user"));
      const watchlist = user?.watchlists?.[listParam] || { movies: [], name: "", description: "" };

      const moviePromises = watchlist.map(async (movie) => {
        try {
          const movieId = movie.id;
          const response = await fetch(`https://www.omdbapi.com/?i=${movieId}&apikey=dd3df0c`);
          const movieData = await response.json();
          return movieData;
        } catch (error) {
          console.error(`Error fetching movie with ID ${movie}:`, error);
          return null;
        }
      });
  
      const fetchedMovies = await Promise.all(moviePromises);
      setMovies(fetchedMovies.filter(movie => movie !== null)); // Filter out null values
      setListName(watchlist.name || listParam); // Autofill list name
      setDescription(watchlist.description || "");
    };
  
    fetchMovies();
  }, [listParam]);

  const handleEdit = () => {
    setShowEditModal(true);
  };

  const handleSaveEdit = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const updatedWatchlist = { ...user.watchlists[listParam], name: listName, description: description };
    user.watchlists[listParam] = updatedWatchlist;
    localStorage.setItem("user", JSON.stringify(user));
    setShowEditModal(false);
  };

  const handleMarkAsWatched = (index) => {
    const updatedMovies = [...movies];
    updatedMovies[index].watched = true; // Mark the movie as watched
    setMovies(updatedMovies);
  
    // Update localStorage
    const user = JSON.parse(localStorage.getItem("user"));
    const movieId = updatedMovies[index].imdbID;
    const currentWatchlist = user.watchlists[listParam];
    const movieIndex = currentWatchlist.findIndex(movie => movie.id === movieId);
    
    if (movieIndex !== -1) {
      // Update watched flag for the movie in the watchlist
      currentWatchlist[movieIndex].watched = true;
      user.watchlists[listParam] = currentWatchlist;
      localStorage.setItem("user", JSON.stringify(user));
    }
  };
  
  

  return (
    <div className='row watchlist-page'>      
      <Navbar/>
      <div className="col-sm-9 px-5">
        <div>
          <div className="watchlist heading-big">
            {listName}
            <button className="edit-btn" onClick={handleEdit}>
              <svg width="25" height="25" fill="#000" class="bi bi-pencil-square" viewBox="0 0 16 16">
                <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
              </svg>
            </button>
          </div>
          <p className="description">{description}</p>
          {movies.length === 0 ? (
            <p className="no-movies">No movies added yet.</p>
          ) : (
            <div className="card-container row">
              {movies.map((movie, index) => (
                <div key={index} className="col-md-2 mb-3">
                  <div className="card">
                    <button
                      className={movie.watched ? "watched-btn" : "to-be-watched-btn"}
                      onClick={() => handleMarkAsWatched(index)} // Handle marking as watched
                    >
                      <img
                        width={50}
                        className="watched-img"
                        src={movie.watched ? watched : yetToWatch}
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
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
            <Modal.Header closeButton>
              <Modal.Title>Edit List</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group controlId="formListName">
                  <Form.Label>List Name</Form.Label>
                  <Form.Control type="text" value={listName} onChange={(e) => setListName(e.target.value)} />
                </Form.Group>
                <Form.Group controlId="formDescription">
                  <Form.Label>Description</Form.Label>
                  <Form.Control as="textarea" rows={3} value={description} onChange={(e) => setDescription(e.target.value)} />
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => setShowEditModal(false)}>Close</Button>
              <Button variant="primary" onClick={handleSaveEdit}>Save Changes</Button>
            </Modal.Footer>
          </Modal>
        </div>
      </div>
    </div>
  );
};

export default Watchlist;
