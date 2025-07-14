import { Route, Routes } from "react-router-dom";
import MoviesPage from "../pages/MoviesPage/MoviesPage";
import MovieInfo from "../pages/MovieInfo/MovieInfo";
import Header from "./Header";
import Favorites from "../pages/Favorites/Favorites";

export default function Navigation() {

  return (

    <div>
      <Header />
      <Routes>
        <Route path='/' element={<MoviesPage />} />
        <Route path='/favorites' element={<Favorites />} />
        <Route path='/:index' element={<MovieInfo />} />
      </Routes>
    </div>

  )
}
