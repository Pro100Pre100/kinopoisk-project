import axios from "axios";
import type { getMoviesProps } from "../interfaces/main";

const api = 'https://api.kinopoisk.dev';

export const getMovies = async ({ queryString }: getMoviesProps) => {



  const res = await axios.get(api + `/v1.4/movie?${queryString}`, {
    headers: {
      'X-API-KEY': 'JAQ0X7B-J1WM9DK-NWRSYEA-BWBRAJT',
    },
  })

  return res.data
}