import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import type { MovieState } from "../../interfaces/main";

export default function MovieInfo() {

  const [movie, setMovie] = useState<MovieState>({ image: '', name: '', description: '', rating: 0, year: 0, genres: [], id: 0});

  const location = useLocation();
  useEffect(() => {
    setMovie(location.state)
  }, [])

  return (
    <div className="min-h-screen bg-neutral-900 text-white p-6 flex flex-col items-center">
      <div className="max-w-5xl w-full flex flex-col md:flex-row gap-6 bg-neutral-800 rounded-xl p-6 shadow-lg">

        <div className="w-full md:w-1/3">
          <img
            src={movie.image || "/fallback.png"}
            alt={movie.name}
            className="w-full h-auto rounded-xl object-cover"
          />
        </div>

        <div className="flex-1 space-y-4">

          <h1 className="text-3xl font-bold">{movie.name}</h1>

          {movie.description && (
            <p className="text-gray-300 leading-relaxed">{movie.description}</p>
          )}

          <div className="flex gap-4 items-center text-yellow-400 font-semibold">
            {movie.rating !== undefined && <span>⭐ {movie.rating}</span>}
            {movie.year && <span className="text-white">• {movie.year}</span>}
          </div>

          {movie.genres && (
            <div className="flex flex-wrap gap-2 pt-2">
              {movie.genres.map((genre) => (
                <span
                  key={genre}
                  className="bg-yellow-500 text-black text-sm font-medium px-3 py-1 rounded-full"
                >
                  {genre}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}