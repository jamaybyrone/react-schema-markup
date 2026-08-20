import "@testing-library/jest-dom";

import React from "react";
import { render } from "@testing-library/react";

import RichMovie from "../src/RichMovie";
import { RichMovieProps } from "../src/types/movie";

interface TestCase {
  scenario: string;
  props: RichMovieProps;
  expectedJsonLd: object;
}

const testCases: TestCase[] = [
  {
    scenario: "renders JSON-LD for a movie with cast and rating",
    props: {
      movie: {
        name: "Casa Bonita: The Motion Picture",
        image: "https://casabonita.com/movie/poster.jpg",
        description: "A cinematic tribute to cliff divers everywhere.",
        datePublished: "2026-06-01",
        directorName: "Chip McElroy",
        actorNames: ["Chip McElroy", "Pat the Diver"],
        ratingValue: 3.8,
        ratingCount: 500,
      },
    },
    expectedJsonLd: {
      "@context": "https://schema.org",
      "@type": "Movie",
      name: "Casa Bonita: The Motion Picture",
      image: "https://casabonita.com/movie/poster.jpg",
      description: "A cinematic tribute to cliff divers everywhere.",
      datePublished: "2026-06-01",
      director: {
        "@type": "Person",
        name: "Chip McElroy",
      },
      actor: [
        { "@type": "Person", name: "Chip McElroy" },
        { "@type": "Person", name: "Pat the Diver" },
      ],
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: 3.8,
        ratingCount: 500,
        bestRating: 5,
        worstRating: 1,
      },
    },
  },
];

const setup = (props: RichMovieProps) => {
  return render(<RichMovie {...props} />);
};

describe("RichMovie", () => {
  it.each(testCases)("$scenario", ({ props, expectedJsonLd }) => {
    const { container } = setup(props);
    const scriptTag = container.querySelector("script");

    const jsonLd = JSON.parse(scriptTag?.textContent || "{}");
    expect(jsonLd).toEqual(expect.objectContaining(expectedJsonLd));
  });
});
