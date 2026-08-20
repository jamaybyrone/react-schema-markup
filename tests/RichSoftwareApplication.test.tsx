import "@testing-library/jest-dom";

import React from "react";
import { render } from "@testing-library/react";

import RichSoftwareApplication from "../src/RichSoftwareApplication";
import { RichSoftwareApplicationProps } from "../src/types/softwareApplication";

interface TestCase {
  scenario: string;
  props: RichSoftwareApplicationProps;
  expectedJsonLd: object;
}

const testCases: TestCase[] = [
  {
    scenario: "renders JSON-LD for a free app with a rating",
    props: {
      app: {
        name: "Casa Bonita Cliff Diver Tracker",
        operatingSystem: "iOS",
        applicationCategory: "LifestyleApplication",
        ratingValue: 4.2,
        ratingCount: 850,
      },
    },
    expectedJsonLd: {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      name: "Casa Bonita Cliff Diver Tracker",
      operatingSystem: "iOS",
      applicationCategory: "LifestyleApplication",
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: 4.2,
        ratingCount: 850,
        bestRating: 5,
        worstRating: 1,
      },
    },
  },
  {
    scenario: "renders JSON-LD for a priced app",
    props: {
      app: {
        name: "Casa Bonita Cliff Diver Tracker Pro",
        operatingSystem: "Android",
        applicationCategory: "LifestyleApplication",
        price: "4.99",
        currency: "GBP",
        ratingValue: 4.8,
        ratingCount: 12,
        bestRating: 10,
        worstRating: 0,
      },
    },
    expectedJsonLd: {
      "@type": "SoftwareApplication",
      offers: {
        "@type": "Offer",
        price: "4.99",
        priceCurrency: "GBP",
      },
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: 4.8,
        ratingCount: 12,
        bestRating: 10,
        worstRating: 0,
      },
    },
  },
];

const setup = (props: RichSoftwareApplicationProps) => {
  return render(<RichSoftwareApplication {...props} />);
};

describe("RichSoftwareApplication", () => {
  it.each(testCases)("$scenario", ({ props, expectedJsonLd }) => {
    const { container } = setup(props);
    const scriptTag = container.querySelector("script");

    const jsonLd = JSON.parse(scriptTag?.textContent || "{}");
    expect(jsonLd).toEqual(expect.objectContaining(expectedJsonLd));
  });
});
