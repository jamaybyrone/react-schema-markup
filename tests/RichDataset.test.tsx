import React from "react";
import { render } from "@testing-library/react";
import RichDataset from "../src/RichDataset";
import {RichDatasetProps} from "../src/types/dataset";

interface TestCase {
  scenario: string;
  props: RichDatasetProps;
  expectedJsonLd: object;
}

type TestCases = TestCase[];

const setup = (props: RichDatasetProps) => {
  return render(<RichDataset {...props} />);
};

const testCases: TestCases = [
  {
    scenario: "renders component for a global temperature dataset",
    props: {
      dataset: {
        name: "Global Temperature Data 2020",
        description: "A dataset containing global temperature readings for the year 2020.",
        url: "https://example.com/global-temperature-data-2020",
        keywords: ["temperature", "climate", "2020", "global data"],
        license: "https://creativecommons.org/licenses/by/4.0/",
        creatorName: "John Doe",
        creatorUrl: "https://example.com/johndoe",
        datePublished: "2020-12-31",
        spatialCoverage: "Global",
      }
    },
    expectedJsonLd: {
      "@context": "https://schema.org",
      "@type": "Dataset",
      name: "Global Temperature Data 2020",
      description: "A dataset containing global temperature readings for the year 2020.",
      url: "https://example.com/global-temperature-data-2020",
      keywords: ["temperature", "climate", "2020", "global data"],
      license: "https://creativecommons.org/licenses/by/4.0/",
      creator: {
        "@type": "Person",
        name: "John Doe",
        url: "https://example.com/johndoe",
      },
      datePublished: "2020-12-31",
      spatialCoverage: "Global",
    },
  },
  {
    scenario: "renders component for a city population dataset",
    props: {
      dataset: {
        name: "City Population Data",
        description: "A dataset with population data for major cities.",
        url: "https://example.com/city-population-data",
        creatorName: "Jane Smith",
        datePublished: "2021-01-01",
      }
    },
    expectedJsonLd: {
      "@context": "https://schema.org",
      "@type": "Dataset",
      name: "City Population Data",
      description: "A dataset with population data for major cities.",
      url: "https://example.com/city-population-data",
      creator: {
        "@type": "Person",
        name: "Jane Smith",
      },
      datePublished: "2021-01-01",
    },
  },
];

describe("RichDataset component", () => {
  it.each(testCases)(
      "$description",
      ({ props, expectedJsonLd }) => {

        const { container } = setup(props);
        const scriptTag = container.querySelector("script");

        const jsonLd = JSON.parse(scriptTag?.textContent || "{}");
        expect(jsonLd).toEqual(expect.objectContaining(expectedJsonLd));
      }
  );
});
