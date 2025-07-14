import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="bg-neutral-900 text-white shadow-md">
      <div className="max-w-100vw mx-auto px-4 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">КиноКаталог</h1>

        <nav className="flex gap-6 ml-auto">
         <Link
            to='/'
            className="hover:text-yellow-400 transition-colors text-lg"
          >
            Все фильмы
          </Link>
                  <Link
            to='/favorites'
            className="hover:text-yellow-400 transition-colors text-lg"
          >
            Избранное
          </Link>
        </nav>
      </div>
    </header>
  )
}
