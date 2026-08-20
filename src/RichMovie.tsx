import { Movie, WithContext } from "schema-dts";
import React, { FC } from "react";
import { RichMovieProps } from "@/types/movie";
import JsonLd from "./JsonLd";

const RichMovie: FC<RichMovieProps> = ({ movie, ScriptWrap }) => {
  const {
    name,
    image,
    description,
    datePublished,
    directorName,
    actorNames,
    ratingValue,
    ratingCount,
    bestRating = 5,
    worstRating = 1,
  } = movie;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Movie",
    name,
    image,
    description,
    datePublished,
    director: directorName && {
      "@type": "Person",
      name: directorName,
    },
    actor: actorNames?.map((actorName) => ({
      "@type": "Person",
      name: actorName,
    })),
    aggregateRating: ratingValue &&
      ratingCount && {
        "@type": "AggregateRating",
        ratingValue,
        ratingCount,
        bestRating,
        worstRating,
      },
  } as WithContext<Movie>;

  return <JsonLd data={jsonLd} ScriptWrap={ScriptWrap} />;
};

export default RichMovie;
