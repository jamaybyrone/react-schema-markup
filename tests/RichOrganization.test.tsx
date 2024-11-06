import "@testing-library/jest-dom";

import React from "react";
import { render } from "@testing-library/react";
import { RichOrganizationProps } from "../src/types/organization";
import RichOrganization from "../src/RichOrganization";

interface TestCase {
  $scenario: string;
  props: RichOrganizationProps;
  expectedJsonLd: object;
}

const testCases: TestCase[] = [
  {
    $scenario: "renders with minimal required props",
    props: {
      name: "Test Organization",
      description: "A test organization",
      url: "https://test.org",
      logo: "https://test.org/logo.png",
      address: {
        streetAddress: "123 Test St",
        addressLocality: "Test City",
        postalCode: "12345",
      },
      email: "contact@test.org",
    },
    expectedJsonLd: {
      "@type": "Organization",
      name: "Test Organization",
      description: "A test organization",
      url: "https://test.org",
      logo: "https://test.org/logo.png",
      address: {
        "@type": "PostalAddress",
        streetAddress: "123 Test St",
        addressLocality: "Test City",
        postalCode: "12345",
      },
      email: "contact@test.org",
    },
  },
  {
    $scenario: "renders with different name and sameAs links",
    props: {
      name: "Another Organization",
      alternateName: "Alt Org",
      description: "Another test organization",
      url: "https://another.org",
      logo: "https://another.org/logo.png",
      address: {
        streetAddress: "456 Another Ave",
        addressLocality: "Another City",
        postalCode: "67890",
      },
      email: "info@another.org",
      sameAs: ["https://facebook.com/another", "https://twitter.com/another"],
    },
    expectedJsonLd: {
      "@type": "Organization",
      name: "Another Organization",
      alternateName: "Alt Org",
      description: "Another test organization",
      url: "https://another.org",
      logo: "https://another.org/logo.png",
      address: {
        "@type": "PostalAddress",
        streetAddress: "456 Another Ave",
        addressLocality: "Another City",
        postalCode: "67890",
      },
      email: "info@another.org",
      sameAs: ["https://facebook.com/another", "https://twitter.com/another"],
    },
  },
];

const setup = (props: RichOrganizationProps) => {
  return render(<RichOrganization {...props} />);
};

describe("RichOrganization", () => {
  it.each(testCases)("$scenario", ({ props, expectedJsonLd }) => {
    const { container } = setup(props);
    const scriptTag = container.querySelector("script");

    const jsonLd = JSON.parse(scriptTag?.textContent || "{}");
    expect(jsonLd).toEqual(expect.objectContaining(expectedJsonLd));
  });
});
