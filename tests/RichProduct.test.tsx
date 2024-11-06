import "@testing-library/jest-dom";
import React from "react";
import { render } from "@testing-library/react";
import RichProduct from "../src/RichProduct";
import {RichProductProps} from "../src/types/product";


interface TestCase {
  scenario: string;
  props: RichProductProps;
  expectedJsonLd: object;
}

const testCases: TestCase[] = [
  {
    scenario: "renders JSON-LD for 'Lord Marmalade IV's Exquisite Posh Picnic Basket'",
    props: {
      product: {
        name: "Lord Marmalade IV's Exquisite Posh Picnic Basket",
        description: "An absurdly overpriced picnic basket with everything a true aristocrat needs to avoid mingling with commoners. Includes a hand-polished silver spoon for tasting the air.",
        sku: "LORD-0001",
        brand: "Unnecessarily Luxurious Essentials",
        price: "4999.99",
        currency: "GBP",
        url: "https://example.com/posh-picnic-basket",
        image: "https://example.com/luxury-picnic.jpg",
        availability: "OutOfStock",
        sellerName: "The Grandiose Goods Company",
      }
    },
    expectedJsonLd: {
      "@context": "https://schema.org",
      "@type": "Product",
      name: "Lord Marmalade IV's Exquisite Posh Picnic Basket",
      description: "An absurdly overpriced picnic basket with everything a true aristocrat needs to avoid mingling with commoners. Includes a hand-polished silver spoon for tasting the air.",
      sku: "LORD-0001",
      brand: {
        "@type": "Brand",
        name: "Unnecessarily Luxurious Essentials",
      },
      offers: {
        "@type": "Offer",
        url: "https://example.com/posh-picnic-basket",
        priceCurrency: "GBP",
        price: "4999.99",
        itemCondition: "https://schema.org/NewCondition",
        availability: "https://schema.org/OutOfStock",
        seller: {
          "@type": "Organization",
          name: "The Grandiose Goods Company",
        },
      },
      image: "https://example.com/luxury-picnic.jpg",
      url: "https://example.com/posh-picnic-basket",
    },
  },
  {
    scenario: "renders JSON-LD for 'The Earl of Eccentricity's Umbrella for Indoor Use Only'",
    props: {
      product: {
        name: "The Earl of Eccentricity's Umbrella for Indoor Use Only",
        description: "A perfectly impractical umbrella designed solely for indoors, protecting one from invisible rain and any lingering sense of reality. A must-have for the absurdly cautious.",
        sku: "ECCENTRIC-UMBRELLA",
        brand: "Truly Unnecessary Items",
        price: "299.99",
        currency: "GBP",
        url: "https://example.com/indoor-umbrella",
        image: "https://example.com/umbrella.jpg",
        availability: "InStock",
        sellerName: "Needless Necessities Ltd.",
      }
    },
    expectedJsonLd: {
      "@context": "https://schema.org",
      "@type": "Product",
      name: "The Earl of Eccentricity's Umbrella for Indoor Use Only",
      description: "A perfectly impractical umbrella designed solely for indoors, protecting one from invisible rain and any lingering sense of reality. A must-have for the absurdly cautious.",
      sku: "ECCENTRIC-UMBRELLA",
      brand: {
        "@type": "Brand",
        name: "Truly Unnecessary Items",
      },
      offers: {
        "@type": "Offer",
        url: "https://example.com/indoor-umbrella",
        priceCurrency: "GBP",
        price: "299.99",
        itemCondition: "https://schema.org/NewCondition",
        availability: "https://schema.org/InStock",
        seller: {
          "@type": "Organization",
          name: "Needless Necessities Ltd.",
        },
      },
      image: "https://example.com/umbrella.jpg",
      url: "https://example.com/indoor-umbrella",
    },
  },
];

const setup = (props: RichProductProps) => {
  return render(<RichProduct {...props} />);
};

describe("RichProduct", () => {
  it.each(testCases)("scenario", ({ props, expectedJsonLd }) => {
    const { container } = setup(props);
    const scriptTag = container.querySelector("script");

    const jsonLd = JSON.parse(scriptTag?.textContent || "{}");
    expect(jsonLd).toEqual(expect.objectContaining(expectedJsonLd));
  });
});
