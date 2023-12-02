import { useEffect, useState } from "react";
import "./App.css";
import SearchIcon from "./search.svg";
import Card from "./Card";
import logo from "./logo.png";

const API_URL = "http://www.omdbapi.com?apikey=d13114d";

const App = () => {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const searchMovies = async (title) => {
    const respone = await fetch(`${API_URL}&s=${title}`);
    const data = await respone.json();

    setMovies(data.Search);
  };

  useEffect(() => {
    searchMovies("batman");
  }, []);

  return (
    <div className="app">
      <img src={logo} alt="Logo" style={{ width: "50px", height: "50px" }} />
      <h1>MovieTv</h1>
      <div className="search">
        <input
          placeholder="Search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <img
          src={SearchIcon}
          alt="search"
          onClick={() => searchMovies(searchTerm)}
        />
      </div>
      {movies?.length > 0 ? (
        <div className="container">
          {movies.map((movie) => (
            <Card movie={movie} />
          ))}
        </div>
      ) : (
        <div className="empty">
          <h2>Movies Not Found</h2>
        </div>
      )}
    </div>
  );
};

export default App;
