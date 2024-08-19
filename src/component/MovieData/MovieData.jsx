import React, { useState } from 'react'
import "./MovieData.css"
import SearchArea from '../SearchArea/SearchArea'

const MovieData = () => {

    const [loading, setLoading] = useState(false)
    const [movieData, setMovieData] = useState(null)
    const [error, setError] = useState(null)

    async function fetchMovieData(query) {
        setLoading(true)
        setError(null);
        try {
            const response = await fetch(`https://api.themoviedb.org/3/search/movie?query=${query}&api_key=7441c0cf4b7a1f37ee126841e3cd0053`)
            const data = await response.json();
            if (data.results.length === 0) {
                setError("No Movies found.");
                setMovieData(null);
            } else {
                const filteredData = data.results.filter(movie => movie.vote_count > 0 && movie.release_date && movie.backdrop_path);
                setMovieData(filteredData);
                setError(null); // Clear any previous error
            }
            console.log('Filtered Data:', filteredData);
        }

        catch (e) {
            console.log(e)
            setError("No Movies found.");
            //setMovieData(null);
        }
        finally {
            setLoading(false)
        }
    }

    async function handleSearch(search) {
        fetchMovieData(search)
    }

    function trimOverview(overview) {
        const maxLength = 500;
        if (overview.length <= maxLength) {
            return overview;
        }

        let trimmed = overview.slice(0, maxLength);
        const lastPeriodIndex = trimmed.lastIndexOf('.');
        return lastPeriodIndex === -1 ? trimmed + '...' : trimmed.slice(0, lastPeriodIndex + 1) + '...';
    }

    return (
        <div>
            <SearchArea handleSearch={handleSearch} />
            {loading && <p>Loading...</p>}
            {error && !movieData && <h2 className="error-message">{error}</h2>}
            {movieData && movieData.length > 0 && (
                <div className='movie-list'>
                    {movieData.map(movie => (
                        <div key={movie.id} className="movie-item">
                            <img src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`} className="movie-poster" alt="" />
                            <h3>{movie.title} <span className="release-date">({movie.release_date || 'N/A'})</span></h3>
                            <p><b>TMDb Rating:</b> {movie.vote_average} / 10 ({movie.vote_count} votes)</p>
                            <p><b>Overview: </b> {trimOverview(movie.overview)}</p>
                        </div>
                    ))}
                </div>
            )}

        </div>
    )
}

export default MovieData