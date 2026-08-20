import "@testing-library/jest-dom";

import React from "react";
import { render } from "@testing-library/react";

import RichWebSite from "../src/RichWebSite";
import { RichWebSiteProps } from "../src/types/website";

interface TestCase {
  scenario: string;
  props: RichWebSiteProps;
  expectedJsonLd: object;
  expectNoSearchAction?: boolean;
}

const testCases: TestCase[] = [
  {
    scenario: "renders JSON-LD without a search action when no template is given",
    props: {
      website: {
        name: "Casa Bonita",
        url: "https://casabonita.com",
      },
    },
    expectedJsonLd: {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: "Casa Bonita",
      url: "https://casabonita.com",
    },
    expectNoSearchAction: true,
  },
  {
    scenario: "renders JSON-LD with a SearchAction for the sitelinks search box",
    props: {
      website: {
        name: "Casa Bonita",
        url: "https://casabonita.com",
        searchUrlTemplate:
          "https://casabonita.com/search?q={search_term_string}",
      },
    },
    expectedJsonLd: {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: "Casa Bonita",
      url: "https://casabonita.com",
      potentialAction: {
        "@type": "SearchAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate:
            "https://casabonita.com/search?q={search_term_string}",
        },
        "query-input": "required name=search_term_string",
      },
    },
  },
];

const setup = (props: RichWebSiteProps) => {
  return render(<RichWebSite {...props} />);
};

describe("RichWebSite", () => {
  it.each(testCases)(
    "$scenario",
    ({ props, expectedJsonLd, expectNoSearchAction }) => {
      const { container } = setup(props);
      const scriptTag = container.querySelector("script");

      const jsonLd = JSON.parse(scriptTag?.textContent || "{}");
      expect(jsonLd).toEqual(expect.objectContaining(expectedJsonLd));

      if (expectNoSearchAction) {
        expect(jsonLd).not.toHaveProperty("potentialAction");
      }
    }
  );
});
