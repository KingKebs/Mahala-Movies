import React, { useState } from "react";
import Moviecard from "./Moviecard";

function Search() {
  // Adding states
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);

  const searchMovies = async (e) => {
    e.preventDefault();

    const apikey = "5dcf7f28a88be0edc01bbbde06f024ab";

    const url = `https://api.themoviedb.org/3/search/movie?api_key=${apikey}&language=en-US&query=${query}&page=1&include_adult=false`;

    try {
      const res = await fetch(url);
      const data = await res.json();
      //   setMovies sets results object "data" from the MOviedb fetch
      setMovies(data.results);
      console(data.results);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <form className="form" onSubmit={searchMovies}>
        <label className="label" htmlFor="query">
          Movie Name
        </label>
        <input
          className="input"
          type="text"
          name="query"
          placeholder="Enter a movie"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button className="button" type="submit">
          Search
        </button>
      </form>
      {/* display the movie information card  */}
      <div class="card-list">
        {movies
          .filter((movie) => movie.poster_path)
          .map((movie) => (
            <Moviecard movie={movie} key={movie.id} />
          ))}
      </div>
    </>
  );
}

export default Search;
