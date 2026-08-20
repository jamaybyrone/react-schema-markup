import "@testing-library/jest-dom";

import React from "react";
import { render } from "@testing-library/react";

import RichLearningResource from "../src/RichLearningResource";
import { RichLearningResourceProps } from "../src/types/learningResource";

interface TestCase {
  scenario: string;
  props: RichLearningResourceProps;
  expectedJsonLd: object;
}

const testCases: TestCase[] = [
  {
    scenario: "renders JSON-LD for a default LearningResource",
    props: {
      resource: {
        name: "Cliff Diving Safety Handout",
        url: "https://casabonita.com/learn/safety",
        educationalLevel: "Beginner",
      },
    },
    expectedJsonLd: {
      "@context": "https://schema.org",
      "@type": "LearningResource",
      name: "Cliff Diving Safety Handout",
      url: "https://casabonita.com/learn/safety",
      educationalLevel: "Beginner",
    },
  },
  {
    scenario: "renders JSON-LD for a Quiz resource type",
    props: {
      resource: {
        name: "Sopapilla Trivia",
        url: "https://casabonita.com/learn/quiz",
        resourceType: "Quiz",
        learningResourceType: "Practice Problem",
        about: "Mexican desserts",
        assesses: "dessert knowledge",
      },
    },
    expectedJsonLd: {
      "@type": "Quiz",
      name: "Sopapilla Trivia",
      learningResourceType: "Practice Problem",
      about: "Mexican desserts",
      assesses: "dessert knowledge",
    },
  },
];

const setup = (props: RichLearningResourceProps) => {
  return render(<RichLearningResource {...props} />);
};

describe("RichLearningResource", () => {
  it.each(testCases)("$scenario", ({ props, expectedJsonLd }) => {
    const { container } = setup(props);
    const scriptTag = container.querySelector("script");

    const jsonLd = JSON.parse(scriptTag?.textContent || "{}");
    expect(jsonLd).toEqual(expect.objectContaining(expectedJsonLd));
  });
});
