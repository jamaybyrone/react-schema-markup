import "@testing-library/jest-dom";
import React from "react";
import { render } from "@testing-library/react";

import RichPhotos from "../src/RichPhotos";
import {RichPhotoProps} from "../src/types/photos";

interface TestCase {
  scenario: string;
  props: RichPhotoProps;
  expectedJsonLd: object;
}

const testCases: TestCase[] = [
  {
    scenario: "renders with minimal required props",
    props: {
      photo: {
        contentUrl: "https://example.com/photo.jpg",
        creditText: "Example Credit",
        copyrightNotice: "© Example 2023",
        creatorName: "Bo Jangles",
      }
    },
    expectedJsonLd: {
      "@type": "ImageObject",
      contentUrl: "https://example.com/photo.jpg",
      creditText: "Example Credit",
      copyrightNotice: "© Example 2023",
      creator: {
        "@type": "Person",
        name: "Bo Jangles",
      },
    },
  },
  {
    scenario: "renders with custom license and acquireLicensePage",
    props: {
     photo: {
       contentUrl: "https://example.com/photo2.jpg",
       creditText: "Another Credit",
       license: "https://example.com/custom-license",
       acquireLicensePage: "https://example.com/license-page",
       copyrightNotice: "© Another Example 2023",
       creatorName: "Bo Jangles",
     }
    },
    expectedJsonLd: {
      "@type": "ImageObject",
      contentUrl: "https://example.com/photo2.jpg",
      license: "https://example.com/custom-license",
      acquireLicensePage: "https://example.com/license-page",
      creditText: "Another Credit",
      copyrightNotice: "© Another Example 2023",
      creator: {
        "@type": "Person",
        name: "Bo Jangles",
      },
    },
  },
];

const setup = (props: RichPhotoProps) => {
  return render(<RichPhotos {...props} />);
};

describe("RichPhotos", () => {
  it.each(testCases)("scenario", ({ props, expectedJsonLd }) => {
    const { container } = setup(props);
    const scriptTag = container.querySelector("script");

    const jsonLd = JSON.parse(scriptTag?.textContent || "{}");
    expect(jsonLd).toEqual(expect.objectContaining(expectedJsonLd));
  });
});
