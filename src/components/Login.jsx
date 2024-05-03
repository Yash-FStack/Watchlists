import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = () => {
    if (!isValidEmail(email)) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    const usersData = localStorage.getItem('users');
    if (usersData) {
      const users = JSON.parse(usersData);
      const user = users.find(user => user.email === email);
      if (user) {
        localStorage.setItem('user', JSON.stringify(user));
        window.location.href = "/";
      } else {
        setErrorMessage('Invalid email. Please try again.');
      }
    } else {
      setErrorMessage('No users found. Please sign up first.');
    }
  };

  const handleEnterKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleLogin();
    }
  };

  const isValidEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  return (
    <div className='form signup text-center'>
      <div className='heading-big text-center'>Log<span>in</span></div>
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
        <Link to={"/sign-up"}>New user?</Link>
      </div>
      <button className="btn btn-danger" onClick={handleLogin}>Login</button>
    </div>
  );
};

export default Login;
