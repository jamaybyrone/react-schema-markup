import React from "react";
import { render } from "@testing-library/react";
import { RichEventProps } from "../src/types/event";
import RichEvent from "../src/RichEvent";

interface TestCase {
  description: string;
  props: RichEventProps;
  expectedJsonLd: object;
}

type TestCases = TestCase[];

const setup = (props: RichEventProps) => {
  return render(<RichEvent {...props} />);
};

const testCases: TestCases = [
  {
    description:
      "renders JSON-LD for an exaggerated 'Real British Culture' event",
    props: {
      event: {
        name: "Annual Celebration of Real British Culture",
        startDate: "2023-12-25T12:00",
        endDate: "2023-12-25T23:00",
        location: {
          name: "The Royal Tea Garden",
          address: "221B Baker Street, London, UK",
        },
        url: "https://example.com/real-british-culture",
        description:
          "An absurdly British event featuring all things quintessentially British: endless tea, queueing competitions, and a mandatory umbrella parade.",
        performer: {
          name: "The Queen's Lookalike Band",
        },
        organizer: {
          name: "Very British Events Ltd.",
          url: "https://example.com",
        },
      },
    },
    expectedJsonLd: {
      "@context": "https://schema.org",
      "@type": "Event",
      name: "Annual Celebration of Real British Culture",
      startDate: "2023-12-25T12:00",
      endDate: "2023-12-25T23:00",
      location: {
        "@type": "Place",
        name: "The Royal Tea Garden",
        address: "221B Baker Street, London, UK",
      },
      url: "https://example.com/real-british-culture",
      description:
        "An absurdly British event featuring all things quintessentially British: endless tea, queueing competitions, and a mandatory umbrella parade.",
      performer: {
        "@type": "Person",
        name: "The Queen's Lookalike Band",
      },
      organizer: {
        "@type": "Organization",
        name: "Very British Events Ltd.",
        url: "https://example.com",
      },
    },
  },
  {
    description:
      "renders JSON-LD for a mysterious lecture on 'The Origins of British Weather Complaints'",
    props: {
      event: {
        name: "The Origins of British Weather Complaints",
        startDate: "2023-10-10T18:00",
        location: {
          name: "The Damp and Cloudy Institute",
          address: "456 Foggy Lane, Manchester, UK",
        },
        url: "https://example.com/weather-complaints",
        description:
          "An in-depth lecture on why the British are so uniquely talented at complaining about the weather. Tea and biscuits provided.",
        organizer: {
          name: "British Meteorology Society",
          url: "https://example.com",
        },
      },
    },
    expectedJsonLd: {
      "@context": "https://schema.org",
      "@type": "Event",
      name: "The Origins of British Weather Complaints",
      startDate: "2023-10-10T18:00",
      location: {
        "@type": "Place",
        name: "The Damp and Cloudy Institute",
        address: "456 Foggy Lane, Manchester, UK",
      },
      url: "https://example.com/weather-complaints",
      description:
        "An in-depth lecture on why the British are so uniquely talented at complaining about the weather. Tea and biscuits provided.",
      organizer: {
        "@type": "Organization",
        name: "British Meteorology Society",
        url: "https://example.com",
      },
    },
  },
];

describe("RichEvent component", () => {
  it.each(testCases)("$description", ({ props, expectedJsonLd }) => {
    const { container } = setup(props);
    const scriptTag = container.querySelector("script");

    const jsonLd = JSON.parse(scriptTag?.textContent || "{}");
    expect(jsonLd).toEqual(expect.objectContaining(expectedJsonLd));
  });
});
