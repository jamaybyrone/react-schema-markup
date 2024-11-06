import "@testing-library/jest-dom";
import React from "react";
import { render } from "@testing-library/react";
import RichFaqs from "../src/RichFaqs";
import {FaqEntity} from "../src/types/faqs";


const mockQuestions: FaqEntity[] = [
  {
    "@type": "Question",
    name: "What is your return policy?",
    acceptedAnswer: {
      "@type": "Answer",
      text: "You can return any item within 30 days.",
    },
  },
  {
    "@type": "Question",
    name: "How long does shipping take?",
    acceptedAnswer: {
      "@type": "Answer",
      text: "Shipping typically takes 5-7 business days.",
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
