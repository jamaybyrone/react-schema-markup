import "@testing-library/jest-dom";

import React from "react";
import { render } from "@testing-library/react";

import RichClaimReview from "../src/RichClaimReview";
import { RichClaimReviewProps } from "../src/types/claimReview";

interface TestCase {
  scenario: string;
  props: RichClaimReviewProps;
  expectedJsonLd: object;
}

const testCases: TestCase[] = [
  {
    scenario: "renders JSON-LD for a fact check",
    props: {
      claimReview: {
        url: "https://casabonita.com/fact-check/cliff-divers",
        claimReviewed: "Casa Bonita's cliff divers use a real cliff.",
        authorName: "Casa Bonita Fact Check",
        authorUrl: "https://casabonita.com/fact-check",
        datePublished: "2026-01-15",
        claimAuthorName: "Anonymous Forum Poster",
        ratingValue: 2,
        alternateName: "Mostly False",
      },
    },
    expectedJsonLd: {
      "@context": "https://schema.org",
      "@type": "ClaimReview",
      url: "https://casabonita.com/fact-check/cliff-divers",
      claimReviewed: "Casa Bonita's cliff divers use a real cliff.",
      author: {
        "@type": "Organization",
        name: "Casa Bonita Fact Check",
        url: "https://casabonita.com/fact-check",
      },
      itemReviewed: {
        "@type": "Claim",
        author: {
          "@type": "Person",
          name: "Anonymous Forum Poster",
        },
      },
      reviewRating: {
        "@type": "Rating",
        ratingValue: 2,
        bestRating: 5,
        worstRating: 1,
        alternateName: "Mostly False",
      },
    },
  },
];

const setup = (props: RichClaimReviewProps) => {
  return render(<RichClaimReview {...props} />);
};

describe("RichClaimReview", () => {
  it.each(testCases)("$scenario", ({ props, expectedJsonLd }) => {
    const { container } = setup(props);
    const scriptTag = container.querySelector("script");

    const jsonLd = JSON.parse(scriptTag?.textContent || "{}");
    expect(jsonLd).toEqual(expect.objectContaining(expectedJsonLd));
  });
});
