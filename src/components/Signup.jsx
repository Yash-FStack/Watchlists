import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import "../styles/Signup.css"

const Signup = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSignUp = () => {
    if (!isValidEmail(email)) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    // Retrieve users data from local storage
    const usersData = localStorage.getItem('users');
    const users = usersData ? JSON.parse(usersData) : [];

    // Check if email or username already exists
    const existingUser = users.find(user => user.email === email || user.username === username);
    if (existingUser) {
      if (existingUser.email === email) {
        setErrorMessage('Email already exists. Please use a different email.');
      } else {
        setErrorMessage('Username already exists. Please choose a different username.');
      }
      return;
    }

    // Add new user data
    const newUser = {
      username: username,
      email: email,
      watchlists: {"MyWatchlist": []}
    };
    users.push(newUser);

    // Store updated users data in local storage
    localStorage.setItem('users', JSON.stringify(users));

    // Redirect or perform any other action after signup
    // For example, redirect to login page
    window.location.href = "/login";
  };

  const handleEnterKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSignUp();
    }
  };

  const isValidEmail = (email) => {
    // Basic email validation
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  return (
    <div className='form signup text-center'>
      <div className='heading-big text-center'>Sign <span>Up</span></div>
      <input
        type="text"
        placeholder="Username"
        className='form-control my-4'
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        onKeyPress={handleEnterKeyPress}
      />
      <input
        type="email"
        placeholder="Email"
        className='form-control my-4'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        onKeyPress={handleEnterKeyPress}
      />
      {errorMessage && <div className="error-message text-danger">{errorMessage}</div>}
      <div className='text-end my-4'>
        <Link to={"/login"}>Already a user?</Link>
      </div>
      <button className="btn btn-danger" onClick={handleSignUp}>Sign Up</button>
    </div>
  );
};

export default Signup;
