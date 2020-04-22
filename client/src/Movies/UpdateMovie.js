import React, {useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import axios from 'axios';

const initialMovie = {
    movie: {
        id: '',
        title: '',
        director: '',
        metascore: '',
        stars: [],
}};

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
        movie: {
            ...movie, [e.target.name] : e.target.value
        }
    })
};

const handleSubmit = e => {
    e.preventDefault();
    axios
        .put(`http://localhost:5000/api/movies/${id}`, movie)
        .then(res => {
            console.log({res});
            props.setMovie(res.data);
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
                placeholder='title'
                value={movie.title}
                onChange={handleChange}
                />

        </form>
    </div>
)
}

export default UpdateMovie;
