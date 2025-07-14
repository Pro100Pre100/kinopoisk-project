import type { MouseEvent, ReactNode } from "react";

export interface MovieState {
  id: number,
  name: string,
  year: number,
  rating: number,
  image: string,
  description: string,
  genres: string[],
}

export interface getMoviesProps {
  queryString: string
}

export interface movieCardProps {
  movie: MovieState,
  isFavorite: boolean,
  removeDelete: () => void
  clickFavorite?: () => void;
}

export interface FilterProps {
  title: string;
  range: [number, number];
  updateRange: (index: 0 | 1, value: number) => void;
}

export interface ModalProps {
  isOpen: boolean
  onClose: () => void
  children: ReactNode
}