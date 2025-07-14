import { useEffect, useState } from 'react';
import type { MovieState } from '../../interfaces/main'
import MovieCard from '../../UI/MovieCard/MovieCard';
import { idInLocalStorage } from '../../utils/idInLocalStorage';

export default function Favorites() {

  const [movies, setMovies] = useState<MovieState[]>([]);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const allId = Object.keys(localStorage);
    const movies = [];
    for (let i = 0; allId.length > i; i++) {
      if (!isNaN(Number(allId[i]))) {
        const movieString = localStorage.getItem(allId[i]);
        if (movieString) {
          movies.push(JSON.parse(movieString));
        }
      }
    }

    setMovies(movies);

  }, [deleting])

  return (
    <div className="min-h-screen bg-neutral-900 text-white p-4">

      <h1 className="text-3xl font-bold mb-6 text-yellow-400">Избранное</h1>

      {movies.length === 0 ? (
        <p className="text-gray-400 text-lg">Вы ещё не добавили фильмы в избранное.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
          {movies.map((movie) => (
            <MovieCard movie={movie} isFavorite={idInLocalStorage(movie.id)} removeDelete={() => setDeleting(true)}/>
          ))}
        </div>
      )}
    </div>
  )
}