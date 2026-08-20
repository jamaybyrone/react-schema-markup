import "@testing-library/jest-dom";

import React from "react";
import { render } from "@testing-library/react";

import RichVideo from "../src/RichVideo";
import { RichVideoProps } from "../src/types/video";

interface TestCase {
  scenario: string;
  props: RichVideoProps;
  expectedJsonLd: object;
}

const testCases: TestCase[] = [
  {
    scenario: "renders JSON-LD for a video",
    props: {
      video: {
        name: "Cliff Diving 101",
        description: "How not to belly flop at Casa Bonita.",
        thumbnailUrl: "https://casabonita.com/video/thumb.jpg",
        uploadDate: "2026-01-01",
        duration: "PT3M20S",
        contentUrl: "https://casabonita.com/video/cliff-diving.mp4",
      },
    },
    expectedJsonLd: {
      "@context": "https://schema.org",
      "@type": "VideoObject",
      name: "Cliff Diving 101",
      description: "How not to belly flop at Casa Bonita.",
      thumbnailUrl: "https://casabonita.com/video/thumb.jpg",
      uploadDate: "2026-01-01",
      duration: "PT3M20S",
      contentUrl: "https://casabonita.com/video/cliff-diving.mp4",
    },
  },
];

const setup = (props: RichVideoProps) => {
  return render(<RichVideo {...props} />);
};

describe("RichVideo", () => {
  it.each(testCases)("$scenario", ({ props, expectedJsonLd }) => {
    const { container } = setup(props);
    const scriptTag = container.querySelector("script");

    const jsonLd = JSON.parse(scriptTag?.textContent || "{}");
    expect(jsonLd).toEqual(expect.objectContaining(expectedJsonLd));
  });
});
