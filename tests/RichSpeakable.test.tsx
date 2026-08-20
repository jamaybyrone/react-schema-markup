import "@testing-library/jest-dom";

import React from "react";
import { render } from "@testing-library/react";

import RichSpeakable from "../src/RichSpeakable";
import { RichSpeakableProps } from "../src/types/speakable";

interface TestCase {
  scenario: string;
  props: RichSpeakableProps;
  expectedJsonLd: object;
}

const testCases: TestCase[] = [
  {
    scenario: "renders JSON-LD with speakable CSS selectors",
    props: {
      speakable: {
        url: "https://casabonita.com/news/cliff-divers",
        name: "Cliff Divers Report Surprisingly Good Water Pressure",
        cssSelectors: [".headline", ".summary"],
      },
    },
    expectedJsonLd: {
      "@context": "https://schema.org",
      "@type": "WebPage",
      url: "https://casabonita.com/news/cliff-divers",
      name: "Cliff Divers Report Surprisingly Good Water Pressure",
      speakable: {
        "@type": "SpeakableSpecification",
        cssSelector: [".headline", ".summary"],
      },
    },
  },
];

const setup = (props: RichSpeakableProps) => {
  return render(<RichSpeakable {...props} />);
};

describe("RichSpeakable", () => {
  it.each(testCases)("$scenario", ({ props, expectedJsonLd }) => {
    const { container } = setup(props);
    const scriptTag = container.querySelector("script");

    const jsonLd = JSON.parse(scriptTag?.textContent || "{}");
    expect(jsonLd).toEqual(expect.objectContaining(expectedJsonLd));
  });
});
