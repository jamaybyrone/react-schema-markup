import "@testing-library/jest-dom";

import React from "react";
import { render } from "@testing-library/react";

import RichOrganization from "../src/RichOrganization";
import {RichOrganizationProps} from "../src/types/organization";

interface TestCase {
  scenario: string;
  props: RichOrganizationProps;
  expectedJsonLd: object;
}

const testCases: TestCase[] = [
  {
    scenario: "renders JSON-LD for Casa Bonita's main attraction",
    props: {
      organization: {
        name: "Casa Bonita",
        description: "A magical dining experience with cliff divers, caves, and sopapillas. Fun for the whole family… maybe.",
        url: "https://casabonita.com",
        logo: "https://casabonita.com/logo.png",
        address: {
          streetAddress: "6715 W Colfax Ave",
          addressLocality: "Lakewood",
          postalCode: "80214",
        },
        email: "info@casabonita.com",
      }
    },
    expectedJsonLd: {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "Casa Bonita",
      description: "A magical dining experience with cliff divers, caves, and sopapillas. Fun for the whole family… maybe.",
      url: "https://casabonita.com",
      logo: "https://casabonita.com/logo.png",
      address: {
        "@type": "PostalAddress",
        streetAddress: "6715 W Colfax Ave",
        addressLocality: "Lakewood",
        postalCode: "80214",
      },
      email: "info@casabonita.com",
    },
  },
  {
    scenario: "renders JSON-LD for Casa Bonita with alternate name and social media links",
    props: {
      organization: {
        name: "Casa Bonita",
        alternateName: "The Greatest Place on Earth",
        description: "Where else can you get dinner and watch cliff divers in a faux cave? A South Park favorite.",
        url: "https://casabonita.com",
        logo: "https://casabonita.com/logo.png",
        address: {
          streetAddress: "6715 W Colfax Ave",
          addressLocality: "Lakewood",
          postalCode: "80214",
        },
        email: "contact@casabonita.com",
        sameAs: ["https://facebook.com/casabonita", "https://twitter.com/casabonita"],
      }
    },
    expectedJsonLd: {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "Casa Bonita",
      alternateName: "The Greatest Place on Earth",
      description: "Where else can you get dinner and watch cliff divers in a faux cave? A South Park favorite.",
      url: "https://casabonita.com",
      logo: "https://casabonita.com/logo.png",
      address: {
        "@type": "PostalAddress",
        streetAddress: "6715 W Colfax Ave",
        addressLocality: "Lakewood",
        postalCode: "80214",
      },
      email: "contact@casabonita.com",
      sameAs: ["https://facebook.com/casabonita", "https://twitter.com/casabonita"],
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
