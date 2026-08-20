import "@testing-library/jest-dom";

import React from "react";
import { render } from "@testing-library/react";

import RichArticle from "../src/RichArticle";
import { RichArticleProps } from "../src/types/article";

interface TestCase {
  scenario: string;
  props: RichArticleProps;
  expectedJsonLd: object;
}

const testCases: TestCase[] = [
  {
    scenario: "renders JSON-LD for a default Article",
    props: {
      article: {
        headline: "Cliff Divers Report Surprisingly Good Water Pressure",
        description: "An investigation into the caves beneath Lakewood.",
        image: "https://casabonita.com/news/cliff-divers.jpg",
        authorName: "Chip McElroy",
        publisherName: "Casa Bonita Gazette",
        publisherLogo: "https://casabonita.com/logo.png",
        datePublished: "2026-01-05",
        url: "https://casabonita.com/news/cliff-divers",
      },
    },
    expectedJsonLd: {
      "@context": "https://schema.org",
      "@type": "Article",
      headline: "Cliff Divers Report Surprisingly Good Water Pressure",
      description: "An investigation into the caves beneath Lakewood.",
      image: "https://casabonita.com/news/cliff-divers.jpg",
      author: {
        "@type": "Person",
        name: "Chip McElroy",
      },
      publisher: {
        "@type": "Organization",
        name: "Casa Bonita Gazette",
        logo: {
          "@type": "ImageObject",
          url: "https://casabonita.com/logo.png",
        },
      },
      datePublished: "2026-01-05",
      dateModified: "2026-01-05",
      mainEntityOfPage: {
        "@type": "WebPage",
        "@id": "https://casabonita.com/news/cliff-divers",
      },
      url: "https://casabonita.com/news/cliff-divers",
    },
  },
  {
    scenario: "renders JSON-LD for a BlogPosting with an author URL and dateModified",
    props: {
      article: {
        articleType: "BlogPosting",
        headline: "Sopapillas: A Ranking",
        image: ["https://casabonita.com/blog/sopapillas-1.jpg"],
        authorName: "Chip McElroy",
        authorUrl: "https://casabonita.com/authors/chip",
        publisherName: "Casa Bonita Gazette",
        publisherLogo: "https://casabonita.com/logo.png",
        datePublished: "2026-01-01",
        dateModified: "2026-01-03",
        url: "https://casabonita.com/blog/sopapillas-ranking",
      },
    },
    expectedJsonLd: {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      headline: "Sopapillas: A Ranking",
      image: ["https://casabonita.com/blog/sopapillas-1.jpg"],
      author: {
        "@type": "Person",
        name: "Chip McElroy",
        url: "https://casabonita.com/authors/chip",
      },
      datePublished: "2026-01-01",
      dateModified: "2026-01-03",
      url: "https://casabonita.com/blog/sopapillas-ranking",
    },
  },
];

const setup = (props: RichArticleProps) => {
  return render(<RichArticle {...props} />);
};

describe("RichArticle", () => {
  it.each(testCases)("$scenario", ({ props, expectedJsonLd }) => {
    const { container } = setup(props);
    const scriptTag = container.querySelector("script");

    const jsonLd = JSON.parse(scriptTag?.textContent || "{}");
    expect(jsonLd).toEqual(expect.objectContaining(expectedJsonLd));
  });
});
