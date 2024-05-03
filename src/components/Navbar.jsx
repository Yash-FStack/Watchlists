import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Navbar.css";

const Navbar = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    // Clear user from local storage
    localStorage.removeItem("user");
    // Redirect to homepage
    window.location.href = "/";
  };

  // Generate a nicely decorated image from the first character of the list title
  const generateImage = (title) => {
    const firstChar = title.charAt(0).toUpperCase();
    return <div className="list-image">{firstChar}</div>;
  };

  const filteredWatchlists = user && user.watchlists ?
    Object.keys(user.watchlists).filter(listName =>
      listName.toLowerCase().includes(searchTerm.toLowerCase())
    ) : [];

  return (
    <div className="col-sm-3">
      <button onClick={() => document.body.classList.toggle('collapsed')} className="toggle-btn">
        <svg width="20" height="20" fill="#fff" className="bi bi-list" viewBox="0 0 16 16">
          <path fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5"/>
        </svg>
      </button>
      <div className="navbar">
        <Link to={"/"}>
          <div className="nav-heading my-4">Watchlists</div>
        </Link>
        <input
          type="text"
          className="form-control my-4 search-input"
          placeholder="Search Watchlists..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <ul className="nav-links">
          <li>
            <Link to="/">
              <svg
                width="20"
                height="20"
                fill="currentColor"
                className="bi bi-house-door"
                viewBox="0 0 16 16"
              >
                <path d="M8.354 1.146a.5.5 0 0 0-.708 0l-6 6A.5.5 0 0 0 1.5 7.5v7a.5.5 0 0 0 .5.5h4.5a.5.5 0 0 0 .5-.5v-4h2v4a.5.5 0 0 0 .5.5H14a.5.5 0 0 0 .5-.5v-7a.5.5 0 0 0-.146-.354L13 5.793V2.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.293zM2.5 14V7.707l5.5-5.5 5.5 5.5V14H10v-4a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5v4z" />
              </svg>
              Home
            </Link>
          </li>
        </ul>
        {user && (
          <div className="heading-sm">My Lists</div>
        )}
        <ul className="user-watchlists">
          {filteredWatchlists.map((listName, index) => (
            <li key={index}>
              <Link to={`/watchlist/${listName}`}>
                {generateImage(listName)}
                {listName}
              </Link>
            </li>
          ))}
        </ul>
        <div className="user-container" onClick={() => setIsExpanded(!isExpanded)}>
          <div>
            <svg
              width="20"
              height="20"
              fill="currentColor"
              className="bi bi-person-circle mx-2"
              viewBox="0 0 16 16"
            >
              <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
              <path
                fillRule="evenodd"
                d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"
              />
            </svg>
            {user ? user.username : "Guest"}
          </div>
          {user && (
            <div className="logout">
              <button onClick={handleLogout}>Logout</button>
            </div>
          )}
          {!user && (
            <Link to={"/login"}>Login</Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
