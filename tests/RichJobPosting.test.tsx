import "@testing-library/jest-dom";

import React from "react";
import { render } from "@testing-library/react";

import RichJobPosting from "../src/RichJobPosting";
import { RichJobPostingProps } from "../src/types/jobPosting";

interface TestCase {
  scenario: string;
  props: RichJobPostingProps;
  expectedJsonLd: object;
}

const testCases: TestCase[] = [
  {
    scenario: "renders JSON-LD for an on-site job posting",
    props: {
      job: {
        title: "Cliff Diver",
        description: "Must be unafraid of faux caves.",
        datePosted: "2026-01-01",
        validThrough: "2026-03-01",
        hiringOrganizationName: "Casa Bonita",
        employmentType: "FULL_TIME",
        jobLocation: {
          addressLocality: "Lakewood",
          addressCountry: "US",
        },
        baseSalary: {
          currency: "USD",
          value: 45000,
          unitText: "YEAR",
        },
      },
    },
    expectedJsonLd: {
      "@context": "https://schema.org",
      "@type": "JobPosting",
      title: "Cliff Diver",
      description: "Must be unafraid of faux caves.",
      datePosted: "2026-01-01",
      validThrough: "2026-03-01",
      hiringOrganization: {
        "@type": "Organization",
        name: "Casa Bonita",
      },
      jobLocation: {
        "@type": "Place",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Lakewood",
          addressCountry: "US",
        },
      },
      baseSalary: {
        "@type": "MonetaryAmount",
        currency: "USD",
        value: {
          "@type": "QuantitativeValue",
          value: 45000,
          unitText: "YEAR",
        },
      },
    },
  },
  {
    scenario: "renders JSON-LD with TELECOMMUTE for a remote posting",
    props: {
      job: {
        title: "Remote Menu Consultant",
        description: "Sopapilla strategy, fully remote.",
        datePosted: "2026-02-01",
        hiringOrganizationName: "Casa Bonita",
        remote: true,
      },
    },
    expectedJsonLd: {
      "@type": "JobPosting",
      jobLocationType: "TELECOMMUTE",
    },
  },
];

const setup = (props: RichJobPostingProps) => {
  return render(<RichJobPosting {...props} />);
};

describe("RichJobPosting", () => {
  it.each(testCases)("$scenario", ({ props, expectedJsonLd }) => {
    const { container } = setup(props);
    const scriptTag = container.querySelector("script");

    const jsonLd = JSON.parse(scriptTag?.textContent || "{}");
    expect(jsonLd).toEqual(expect.objectContaining(expectedJsonLd));
  });
});
