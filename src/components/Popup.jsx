import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useEffect } from "react";
function Popup({ show, handleClose, selectedMovie }) {
  const [watchlists, setWatchlists] = useState([]);
  const [user, setUser] = useState([]);
  const [selectedWatchlist, setSelectedWatchlist] = useState("");
  const [newWatchlistName, setNewWatchlistName] = useState("");
  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      const tempUser = JSON.parse(userData);
      setUser(tempUser);
      const existingWatchlists = tempUser.watchlists ? Object.keys(tempUser.watchlists) : [];
      setWatchlists(existingWatchlists);
    }
  }, []);
  const handleNewWatchlist = () => {
    const userData = localStorage.getItem("user");
    if (userData) {
      const tempUser = JSON.parse(userData);
      setUser(tempUser);
      
      if (user.watchlists && typeof user.watchlists === "object" && newWatchlistName !== '') {
        user.watchlists[newWatchlistName] = [];
        localStorage.setItem("user", JSON.stringify(user));
        setWatchlists(Object.keys(user.watchlists));
        
      }
    }
  };

  const handleCheckboxChange = (listName) => {
    setSelectedWatchlist(listName);
  };

  // Function to add movie to selected watchlists
  const addToWatchlists = () => {
    // Add movie to selected watchlists
    // Implement your logic here
    if(selectedWatchlist !== '')
      {
        let tempUser = localStorage.getItem("user");
        let userData = JSON.parse(tempUser);
        userData.watchlists[selectedWatchlist].push(selectedMovie);
        localStorage.setItem("user", JSON.stringify(userData));
        handleClose();
      }
      else{
        alert('Please select a Watchlist');
      }
  };
  
  const renderWatchlistCheckboxes = () => {
    return (
      <div>
        {watchlists.map((listName, index) => (
          <div className="d-flex" key={index}>
            <input
            className="form-check mx-2"
              type="checkbox"
              id={listName}
              name={listName}
              checked={selectedWatchlist === listName}
              onChange={() => handleCheckboxChange(listName)}
            />
            <label className="lead" htmlFor={listName}>{listName}</label>
          </div>
        ))}
      </div>
    );
  };

  const renderCreateWatchlistInput = () => {
    return (
      <div className="text-center">
        <input
          type="text"
          className="form-control w-50 mx-auto my-4"
          placeholder="New Watchlist Name"
          onChange={(e) => setNewWatchlistName(e.target.value)}
        />
        <button className="btn btn-success mb-2" onClick={handleNewWatchlist}>Add New Watchlist</button>
      </div>
    );
  };

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add to Watchlist</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {renderWatchlistCheckboxes()}
          {renderCreateWatchlistInput()}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={addToWatchlists}>
            Add to Watchlists
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Popup;
