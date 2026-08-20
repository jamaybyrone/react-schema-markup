import "@testing-library/jest-dom";

import React from "react";
import { render } from "@testing-library/react";

import RichCourse from "../src/RichCourse";
import { RichCourseProps } from "../src/types/course";

interface TestCase {
  scenario: string;
  props: RichCourseProps;
  expectedJsonLd: object;
}

const testCases: TestCase[] = [
  {
    scenario: "renders JSON-LD for a free course",
    props: {
      course: {
        name: "Intro to Cliff Diving",
        description: "Learn the basics of faux-cave cliff diving.",
        providerName: "Casa Bonita University",
        providerUrl: "https://casabonita.com/university",
      },
    },
    expectedJsonLd: {
      "@context": "https://schema.org",
      "@type": "Course",
      name: "Intro to Cliff Diving",
      description: "Learn the basics of faux-cave cliff diving.",
      provider: {
        "@type": "Organization",
        name: "Casa Bonita University",
        sameAs: "https://casabonita.com/university",
      },
    },
  },
  {
    scenario: "renders JSON-LD for a priced course with a rating",
    props: {
      course: {
        name: "Advanced Sopapilla Theory",
        description: "A graduate-level dessert seminar.",
        providerName: "Casa Bonita University",
        courseCode: "CB201",
        price: "199.00",
        currency: "USD",
        ratingValue: 4.9,
        ratingCount: 30,
      },
    },
    expectedJsonLd: {
      "@type": "Course",
      courseCode: "CB201",
      offers: {
        "@type": "Offer",
        price: "199.00",
        priceCurrency: "USD",
      },
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: 4.9,
        ratingCount: 30,
      },
    },
  },
];

const setup = (props: RichCourseProps) => {
  return render(<RichCourse {...props} />);
};

describe("RichCourse", () => {
  it.each(testCases)("$scenario", ({ props, expectedJsonLd }) => {
    const { container } = setup(props);
    const scriptTag = container.querySelector("script");

    const jsonLd = JSON.parse(scriptTag?.textContent || "{}");
    expect(jsonLd).toEqual(expect.objectContaining(expectedJsonLd));
  });
});
