import "@testing-library/jest-dom";
import React from "react";
import { render } from "@testing-library/react";
import RichFaqs from "../src/RichFaqs";
import { FaqEntity } from "../src/types/faqs";

const mockQuestions: FaqEntity[] = [
  {
    question: "How large is your cat?",
    answer: "Yes.",
  },
  {
    question: "Can you microwave paint?",
    answer: "Yes.",
  }
];

const setup = (faqs: FaqEntity[]) =>
  render(<RichFaqs faqs={faqs} />);

interface TestCase {
  scenario: string;
  faqs: FaqEntity[];
}

const testCases: TestCase[] = [
  {
    scenario: "FAQ structure with valid questions",
    faqs: mockQuestions,
  },
  {
    scenario: "Empty questions array",
    faqs: [],
  },
];

describe("RichFaqs Component", () => {
  it.each(testCases)("renders with $scenario", ({ faqs }) => {
    const { container } = setup(faqs);
    const scriptTag = container.querySelector("script");
    expect(scriptTag).toBeInTheDocument();

    if (faqs.length > 0) {
      const jsonLd = JSON.parse(scriptTag?.textContent || "{}");
      expect(jsonLd["@context"]).toBe("https://schema.org");
      expect(jsonLd["@type"]).toBe("FAQPage");
    } else {
      expect(scriptTag?.textContent).toContain('"mainEntity": []');
    }
  });
});
