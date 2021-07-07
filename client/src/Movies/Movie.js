import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouteMatch, useHistory } from 'react-router-dom';
import MovieCard from './MovieCard';

function Movie({ addToSavedList, movies}) {
  const [movie, setMovie] = useState(null);
  const match = useRouteMatch();
  const { push } = useHistory();


  const fetchMovie = id => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then(res => setMovie(res.data))
      .catch(err => console.log(err.response));
  };

  const saveMovie = () => {
    addToSavedList(movie);
  };

  const deleteMovie = e => {
    console.log('movies' , movies);
    e.preventDefault();
    axios 
      .delete(`http://localhost:5000/api/movies/${movie.id}`)
      .then(res => {
        console.log('then movies', movies)
        movies = (movies.filter(movie => `${movie.id}` !== res.data));
        push('/')
        console.log('movies after push', movies)
        })
      .catch(err => console.log('delete err', err))
    };
  
  useEffect(() => {
    fetchMovie(match.params.id);
  }, [match.params.id]);

  if (!movie) {
    return <div>Loading movie information...</div>;
  }

  return (
    <div className='save-wrapper'>
      <MovieCard movie={movie} />
      <div className='update-button' onClick={() => push(`/update-movie/${movie.id}`)}>
        Update
      </div>
      <div className='save-button' onClick={saveMovie}>
        Save
      </div>
      
      <div className='delete-button' onClick={deleteMovie}>
        Delete
      </div>
    </div>
  );
}

export default Movie;
