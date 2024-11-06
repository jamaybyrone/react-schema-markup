import "@testing-library/jest-dom";
import React from "react";
import { render } from "@testing-library/react";
import { RichPhotoProps } from "../src/types/photos";
import RichPhotos from "../src/components/RichPhotos";

interface TestCase {
  scenario: string;
  props: RichPhotoProps;
  expectedJsonLd: object;
}

const testCases: TestCase[] = [
  {
    scenario: "renders with minimal required props",
    props: {
      contentUrl: "https://example.com/photo.jpg",
      creditText: "Example Credit",
      copyrightNotice: "© Example 2023",
      creatorName: "John Doe",
    },
    expectedJsonLd: {
      "@type": "ImageObject",
      contentUrl: "https://example.com/photo.jpg",
      creditText: "Example Credit",
      copyrightNotice: "© Example 2023",
      creator: {
        "@type": "Person",
        name: "John Doe",
      },
    },
  },
  {
    scenario: "renders with custom license and acquireLicensePage",
    props: {
      contentUrl: "https://example.com/photo2.jpg",
      creditText: "Another Credit",
      license: "https://example.com/custom-license",
      acquireLicensePage: "https://example.com/license-page",
      copyrightNotice: "© Another Example 2023",
      creatorName: "Jane Smith",
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
        name: "Jane Smith",
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
