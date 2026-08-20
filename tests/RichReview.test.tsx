import "@testing-library/jest-dom";

import React from "react";
import { render } from "@testing-library/react";

import RichReview from "../src/RichReview";
import { RichReviewProps } from "../src/types/review";

interface TestCase {
  scenario: string;
  props: RichReviewProps;
  expectedJsonLd: object;
}

const testCases: TestCase[] = [
  {
    scenario: "renders JSON-LD with default rating bounds",
    props: {
      review: {
        itemReviewedName: "Casa Bonita",
        authorName: "Chip McElroy",
        reviewBody: "The cliff divers alone are worth the trip.",
        ratingValue: 4,
      },
    },
    expectedJsonLd: {
      "@context": "https://schema.org",
      "@type": "Review",
      itemReviewed: {
        "@type": "Product",
        name: "Casa Bonita",
      },
      author: {
        "@type": "Person",
        name: "Chip McElroy",
      },
      reviewBody: "The cliff divers alone are worth the trip.",
      reviewRating: {
        "@type": "Rating",
        ratingValue: 4,
        bestRating: 5,
        worstRating: 1,
      },
    },
  },
  {
    scenario: "renders JSON-LD for a LocalBusiness review with a custom rating scale",
    props: {
      review: {
        itemReviewedName: "Casa Bonita",
        itemReviewedType: "LocalBusiness",
        itemReviewedUrl: "https://casabonita.com",
        itemReviewedImage: "https://casabonita.com/logo.png",
        authorName: "Chip McElroy",
        datePublished: "2026-02-14",
        ratingValue: 9,
        bestRating: 10,
        worstRating: 0,
      },
    },
    expectedJsonLd: {
      "@context": "https://schema.org",
      "@type": "Review",
      itemReviewed: {
        "@type": "LocalBusiness",
        name: "Casa Bonita",
        url: "https://casabonita.com",
        image: "https://casabonita.com/logo.png",
      },
      datePublished: "2026-02-14",
      reviewRating: {
        "@type": "Rating",
        ratingValue: 9,
        bestRating: 10,
        worstRating: 0,
      },
    },
  },
];

const setup = (props: RichReviewProps) => {
  return render(<RichReview {...props} />);
};

describe("RichReview", () => {
  it.each(testCases)("$scenario", ({ props, expectedJsonLd }) => {
    const { container } = setup(props);
    const scriptTag = container.querySelector("script");

    const jsonLd = JSON.parse(scriptTag?.textContent || "{}");
    expect(jsonLd).toEqual(expect.objectContaining(expectedJsonLd));
  });
});
