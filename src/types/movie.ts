import { ElementType } from "react";

export interface MovieType {
  name: string;
  image?: string;
  description?: string;
  datePublished?: string;
  directorName?: string;
  actorNames?: string[];
  ratingValue?: number;
  ratingCount?: number;
  bestRating?: number;
  worstRating?: number;
}

export interface RichMovieProps {
  movie: MovieType;
  ScriptWrap?: ElementType;
}
