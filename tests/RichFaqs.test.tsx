import "@testing-library/jest-dom";
import React from "react";
import { render } from "@testing-library/react";
import RichFaqs from "../src/RichFaqs";
import { FaqEntity } from "../src/types/faqs";

const mockQuestions: FaqEntity[] = [
  {
    "@type": "Question",
    name: "How large is your cat?",
    acceptedAnswer: {
      "@type": "Answer",
      text: "Oh lawd he big.",
    },
  },
  {
    "@type": "Question",
    name: "Can you microwave paint?",
    acceptedAnswer: {
      "@type": "Answer",
      text: "Yes.",
    },
  },
];

const setup = (questions: FaqEntity[]) =>
  render(<RichFaqs questions={questions} />);

interface TestCase {
  scenario: string;
  questions: FaqEntity[];
}

const testCases: TestCase[] = [
  {
    scenario: "FAQ structure with valid questions",
    questions: mockQuestions,
  },
  {
    scenario: "Empty questions array",
    questions: [],
  },
];

describe("RichFaqs Component", () => {
  it.each(testCases)("renders with $scenario", ({ questions }) => {
    const { container } = setup(questions);
    const scriptTag = container.querySelector("script");
    expect(scriptTag).toBeInTheDocument();

    if (questions.length > 0) {
      const jsonLd = JSON.parse(scriptTag?.textContent || "{}");
      expect(jsonLd["@context"]).toBe("https://schema.org");
      expect(jsonLd["@type"]).toBe("FAQPage");
      expect(jsonLd.mainEntity).toEqual(questions);
    } else {
      expect(scriptTag?.textContent).toContain('"mainEntity": []');
    }
  });
});
