import { useNavigate } from 'react-router-dom'
import type { movieCardProps } from '../../interfaces/main'
import type { MouseEvent } from 'react';

export default function MovieCard({ movie, isFavorite, clickFavorite, removeDelete }: movieCardProps) {

  const navigate = useNavigate();

  const toNavigateMovie = () => {
    navigate(`/${movie.id}`, { state: movie })
  }

  const openModalMovie = (event: MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
    if (clickFavorite) {
      clickFavorite();
    }

  }

  const deleteFromFavorite = (event: MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
    removeDelete();
    localStorage.removeItem(String(movie.id));
  }

  return (
    <div
      key={movie.id}
      className="bg-neutral-800 rounded-xl hover:scale-105 transition-transform relative"
      onClick={toNavigateMovie}
    >

      <img src={movie.image} alt={movie.name} className="w-full h-64 object-cover" />
      <div className="p-3">
        <h2 className="text-lg font-semibold">{movie.name}</h2>
        <p className="text-sm text-gray-400">{movie.genres?.join(", ")} · {movie.year}</p>
        <p className="text-yellow-400 font-semibold mt-1">⭐ {movie.rating}</p>
      </div>
      <div className="bg-neutral-800 absolute flex items-center justify-center bottom-2 right-2 w-8 h-8 z-10 rounded-[50%] active:bg-neutral-600 transition-duration: 300ms hover:bg-neutral-700" onClick={!isFavorite ? openModalMovie : deleteFromFavorite}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill={isFavorite ? 'green' : 'red'}
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke={isFavorite ? 'green' : 'red'}
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 17.25L7.5 20l1.125-5.25L4.5 10.5l5.4-.45L12 5l2.1 5.05 5.4.45-4.125 4.25L16.5 20 12 17.25z"
          />
        </svg>
      </div>
    </div>

  )
}