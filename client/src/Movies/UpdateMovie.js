import React, {useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import axios from 'axios';

const initialMovie = {
        id: '',
        title: '',
        director: '',
        metascore: '',
        stars: [],
};

const UpdateMovie = props => {
    const { push } = useHistory();
    const [movie, setMovie] = useState(initialMovie);
    const { id } = useParams();
    useEffect(() => {
        axios
        .get(`http://localhost:5000/api/movies/${id}`)
        .then(res => {
            console.log('res', res.data)
            setMovie(res.data);
        })
        .catch(err => console.log('get err', err))
    }, [id]);

const handleChange = e => {
    setMovie({
         ...movie, [e.target.name] : e.target.value
        
})
};

const handleSubmit = e => {

    console.log({id});
    console.log('initial', movie);
    e.preventDefault();
    axios
        .put(`http://localhost:5000/api/movies/${movie.id}`, movie)
        .then(res => {
            console.log('res before setmovie',res.data);
            setMovie(res.data);
            console.log('res after setmovie', res.data)
            push(`/movies/${id}`)
         })
         .catch(err => console.log('put err', err))
}

return(
    <div>
        <h2>Update Movie!</h2>
        <form onSubmit={handleSubmit}>
            <input
                type='text'
                name='title'
                placeholder='Title'
                value={movie.title}
                onChange={handleChange}
                />
            <input
                type='text'
                name='director'
                placeholder='Director'
                value={movie.director}
                onChange={handleChange}
            />
             <input
                type='text'
                name='metascore'
                placeholder='Metascore'
                value={movie.metascore}
                onChange={handleChange}
            />
      
            <input
                type='text'
                name='stars'
                placeholder='Stars'
                value={movie.stars}
                onChange={handleChange}
            />
            <button className='update-button' onClick={handleSubmit}>Update Movie</button> 

        </form>
    </div>
)
}

export default UpdateMovie;
