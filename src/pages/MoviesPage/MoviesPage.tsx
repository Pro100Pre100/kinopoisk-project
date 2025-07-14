import { useIntersectionObserver } from "@siberiacancode/reactuse";
import { useEffect, useState } from "react";
// import { getMovies } from "../../api/movie";
import type { MovieState } from "../../interfaces/main";
import noneImage from '../../assets/none.png'
import { useSearchParams } from "react-router-dom";
import MovieCard from "../../UI/MovieCard/MovieCard";
import { allGenres } from "../../utils/consts";
import Filter from "../../UI/Filter/Filter";
import Modal from "../../UI/Modal/Modal";
import { idInLocalStorage } from "../../utils/idInLocalStorage";
import { getMovies } from "../../api/movie";

export default function MoviesPage() {
  const [movies, setMovies] = useState<MovieState[]>([]);
  const [page, setPage] = useState(1);

  //Если выбрать больше одного жанра, не обязательно, что каждый из этих жанров будет в фильме
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [yearRange, setYearRange] = useState<[number, number]>([2000, 2025]);
  const [ratingRange, setRatingRange] = useState<[number, number]>([0, 10]);
  const [open, setOpen] = useState(false);
  const [favoriteIndex, setFavoriteIndex] = useState<number>(0);
  //Чтобы при добавлении в избранное и удалении из него список обновлялся
  const [deleting, setDeleting] = useState(false);

  const [_, setSearch] = useSearchParams({});

  const toggleGenre = (genre: string) => {
    setMovies([]);
    setPage(1);
    setSelectedGenres((prev) =>
      prev.includes(genre) ? prev.filter((g) => g !== genre) : [...prev, genre]
    );
  };

  const updateYear = (index: 0 | 1, value: number) => {
    setMovies([]);
    setPage(1);
    setYearRange((prev) => {
      const copy = [...prev] as [number, number];
      copy[index] = value;
      return copy;
    });
  };

  const updateRating = (index: 0 | 1, value: number) => {
    setMovies([]);
    setPage(1);
    setRatingRange((prev) => {
      const copy = [...prev] as [number, number];
      copy[index] = value;
      return copy;
    });
  };

  useEffect(() => {
    const genresString = selectedGenres.map((genre) => 'genres.name=' + genre);
    const queryString = `${genresString}&limit=50&page=${page}&year=${yearRange[0]}-${yearRange[1]}&rating.imdb=${ratingRange[0]}-${ratingRange[1]}`;
    setSearch(queryString);

    const fetch = async () => {
      const movies = await getMovies({ queryString });

      const resultFilms = movies.docs.map((film: any) => ({
        id: film.id,
        name: film.name || film.alternativeName,
        year: film.year,
        rating: film.rating?.imdb,
        image: film.poster?.url || noneImage,
        description: film.description ? film.description : 'Описание отсутсвует',
        genres: film.genres?.map((g: { name: string }) => g.name),
      }));

      setMovies((prev) => [...prev, ...resultFilms]);
    };

    fetch();
  }, [page, selectedGenres, yearRange, ratingRange, deleting]);

  const { ref } = useIntersectionObserver<HTMLDivElement>({
    threshold: 1,
    onChange: (entry) => {
      if (entry.isIntersecting) setPage((prev) => prev + 1);
    },
  });

  const addToFavorite = (movie: MovieState) => {
    localStorage.setItem(String(movie.id), JSON.stringify(movie));
    console.log(localStorage);
  }

  const openModal = ( index: number) => {
    setDeleting(true);
    setOpen(true);
    setFavoriteIndex(index);
  }

  return (
    <div className="min-h-screen bg-neutral-900 text-white p-4">
      <Modal isOpen={open} onClose={() => setOpen(false)}>
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-4">Вы хотите добавить эту карточку в избранное?</h2>
          <div className="flex justify-center gap-4 mt-6">
            <button
              onClick={() => { addToFavorite(movies[favoriteIndex]); setOpen(false); }}
              className="bg-yellow-500 hover:bg-yellow-400 text-black px-5 py-2 rounded-lg transition"
            >
              Подтвердить
            </button>
            <button
              onClick={() => setOpen(false)}
              className="bg-neutral-700 hover:bg-neutral-600 text-white px-5 py-2 rounded-lg transition"
            >
              Отмена
            </button>
          </div>
        </div>
      </Modal>
      <div className="grid gap-4 md:grid-cols-3  mb-6">

        <div className="bg-neutral-800 p-3 rounded">
          <p className="mb-2 font-semibold">Жанры</p>
          <div className="flex flex-wrap gap-2">
            {allGenres.map((genre) => (
              <button
                key={genre}
                className={`px-2 py-1 rounded text-sm border 
                  ${selectedGenres.includes(genre)
                    ? "bg-yellow-500 text-black border-yellow-500"
                    : "border-gray-500 text-white"}`}
                onClick={() => toggleGenre(genre)}
              >
                {genre}
              </button>
            ))}
          </div>
        </div>

        <Filter title='Год выпуска' range={yearRange} updateRange={updateYear} />

        <Filter title='Imdb Рейтинг' range={ratingRange} updateRange={updateRating} />

      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
        {movies.map((movie, index) => (
          <MovieCard movie={movie} isFavorite={idInLocalStorage(movie.id)} clickFavorite={() => openModal(index)} removeDelete={() => setDeleting(false)}/>
        ))}
      </div>

      {!!movies.length 
      ? (
        <div className="text-center mt-10 text-gray-500" ref={ref}>
          Загрузка следующих фильмов...
        </div>
      )
    : 'Ожидайте загрузки...'}
    </div>
  );
}
