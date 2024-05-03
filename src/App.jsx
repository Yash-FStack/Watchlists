// App.js
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Watchlist from "./components/Watchlist";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/sign-up" element={<Signup />} />
          <Route path="/watchlist/:listName" element={<Watchlist />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
