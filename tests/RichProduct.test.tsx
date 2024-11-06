import "@testing-library/jest-dom";
import React from "react";
import { render } from "@testing-library/react";
import { RichProductProps } from "@/types/product";
import RichProduct from "../src/RichProduct";


interface TestCase {
  scenario: string;
  props: RichProductProps;
  expectedJsonLd: object;
}

const testCases: TestCase[] = [
  {
    scenario: "renders with minimal required props",
    props: {
      name: "Test Product",
      description: "A test product description",
      sku: "12345",
      brand: "Test Brand",
      price: "99.99",
      currency: "GBP",
      url: "https://example.com/test-product",
      image: "https://example.com/image.jpg",
      availability: "InStock",
      sellerName: "Test Seller",
    },
    expectedJsonLd: {
      "@context": "https://schema.org",
      "@type": "Product",
      name: "Test Product",
      description: "A test product description",
      sku: "12345",
      brand: {
        "@type": "Brand",
        name: "Test Brand",
      },
      offers: {
        "@type": "Offer",
        url: "https://example.com/test-product",
        priceCurrency: "GBP",
        price: "99.99",
        itemCondition: "https://schema.org/NewCondition",
        availability: "https://schema.org/InStock",
        seller: {
          "@type": "Organization",
          name: "Test Seller",
        },
      },
      image: "https://example.com/image.jpg",
      url: "https://example.com/test-product",
    },
  },
  {
    scenario: "renders with custom offersUrl",
    props: {
      name: "Another Product",
      description: "Another product description",
      sku: "67890",
      brand: "Another Brand",
      price: "149.99",
      currency: "GBP",
      url: "https://example.com/another-product",
      image: "https://example.com/image2.jpg",
      availability: "OutOfStock",
      offersUrl: "https://example.com/custom-offer",
      sellerName: "Another Seller",
    },
    expectedJsonLd: {
      "@context": "https://schema.org",
      "@type": "Product",
      name: "Another Product",
      description: "Another product description",
      sku: "67890",
      brand: {
        "@type": "Brand",
        name: "Another Brand",
      },
      offers: {
        "@type": "Offer",
        url: "https://example.com/custom-offer",
        priceCurrency: "GBP",
        price: "149.99",
        itemCondition: "https://schema.org/NewCondition",
        availability: "https://schema.org/OutOfStock",
        seller: {
          "@type": "Organization",
          name: "Another Seller",
        },
      },
      image: "https://example.com/image2.jpg",
      url: "https://example.com/another-product",
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
