import "@testing-library/jest-dom";

import React from "react";
import { render } from "@testing-library/react";

import RichLocalBusiness from "../src/RichLocalBusiness";
import { RichLocalBusinessProps } from "../src/types/localBusiness";

interface TestCase {
  scenario: string;
  props: RichLocalBusinessProps;
  expectedJsonLd: object;
}

const testCases: TestCase[] = [
  {
    scenario: "renders JSON-LD for a default LocalBusiness",
    props: {
      business: {
        name: "Casa Bonita",
        url: "https://casabonita.com",
        address: {
          streetAddress: "6715 W Colfax Ave",
          addressLocality: "Lakewood",
          postalCode: "80214",
          addressCountry: "US",
        },
      },
    },
    expectedJsonLd: {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      name: "Casa Bonita",
      url: "https://casabonita.com",
      address: {
        "@type": "PostalAddress",
        streetAddress: "6715 W Colfax Ave",
        addressLocality: "Lakewood",
        postalCode: "80214",
        addressCountry: "US",
      },
      sameAs: [],
    },
  },
  {
    scenario:
      "renders JSON-LD for a FoodEstablishment with geo, hours and socials",
    props: {
      business: {
        name: "Casa Bonita",
        businessType: "FoodEstablishment",
        description: "Cliff divers, caves, and sopapillas.",
        url: "https://casabonita.com",
        telephone: "+1-303-555-0100",
        image: "https://casabonita.com/storefront.jpg",
        priceRange: "$$",
        address: {
          streetAddress: "6715 W Colfax Ave",
          addressLocality: "Lakewood",
          addressRegion: "CO",
          postalCode: "80214",
          addressCountry: "US",
        },
        geo: {
          latitude: 39.7413,
          longitude: -105.0827,
        },
        openingHours: ["Mo-Su 11:00-21:00"],
        sameAs: ["https://facebook.com/casabonita"],
      },
    },
    expectedJsonLd: {
      "@context": "https://schema.org",
      "@type": "FoodEstablishment",
      name: "Casa Bonita",
      description: "Cliff divers, caves, and sopapillas.",
      telephone: "+1-303-555-0100",
      image: "https://casabonita.com/storefront.jpg",
      priceRange: "$$",
      address: {
        "@type": "PostalAddress",
        streetAddress: "6715 W Colfax Ave",
        addressLocality: "Lakewood",
        addressRegion: "CO",
        postalCode: "80214",
        addressCountry: "US",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: 39.7413,
        longitude: -105.0827,
      },
      openingHours: ["Mo-Su 11:00-21:00"],
      sameAs: ["https://facebook.com/casabonita"],
    },
  },
];

const setup = (props: RichLocalBusinessProps) => {
  return render(<RichLocalBusiness {...props} />);
};

describe("RichLocalBusiness", () => {
  it.each(testCases)("$scenario", ({ props, expectedJsonLd }) => {
    const { container } = setup(props);
    const scriptTag = container.querySelector("script");

    const jsonLd = JSON.parse(scriptTag?.textContent || "{}");
    expect(jsonLd).toEqual(expect.objectContaining(expectedJsonLd));
  });
});
