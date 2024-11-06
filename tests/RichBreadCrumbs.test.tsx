import "@testing-library/jest-dom";
import { render } from "@testing-library/react";

import React from "react";
import { RichBreadCrumbDataProps } from "@/types/breadcrumb";
import RichBreadCrumbs from "../src/RichBreadCrumbs";

const setup = (props: RichBreadCrumbDataProps, locationOverride: string) => {
  const mockLocation = {
    href: locationOverride,
    origin: new URL(locationOverride).origin,
    pathname: new URL(locationOverride).pathname,
  };

  jest
    .spyOn(window, "location", "get")
    .mockImplementation(() => mockLocation as unknown as any);

  return render(<RichBreadCrumbs {...props} />);
};

const testCases = [
  {
    scenario: "renders breadcrumb correctly without trailing slash",
    locationOverride: "http://localhost/en/products/something",
    props: {},
    expectedJsonLd: {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: "http://localhost",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Products",
          item: "http://localhost/en/products",
        },
        {
          "@type": "ListItem",
          position: 3,
          name: "Something",
          item: "http://localhost/en/products/something",
        },
      ],
    },
  },
  {
    scenario:
      "renders breadcrumb with trailing slash when includeTrailingSlash is true",
    locationOverride: "http://localhost/en/products/something/",
    props: { includeTrailingSlash: true },
    expectedJsonLd: {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: "http://localhost/",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Products",
          item: "http://localhost/en/products/",
        },
        {
          "@type": "ListItem",
          position: 3,
          name: "Something",
          item: "http://localhost/en/products/something/",
        },
      ],
    },
  },
  {
    description: "handles unsupported locales",
    locationOverride: "http://localhost/es/products",
    props: { supportedLocales: ["fr", "de"] },
    expectedJsonLd: {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: "http://localhost",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Es",
          item: "http://localhost/es",
        },
        {
          "@type": "ListItem",
          position: 3,
          name: "Products",
          item: "http://localhost/es/products",
        },
      ],
    },
  },
];

describe("RichBreadCrumbData", () => {
  it.each(testCases)(
    "$scenario",
    ({ locationOverride, props, expectedJsonLd }) => {
      const { container } = setup(
        props as RichBreadCrumbDataProps,
        locationOverride
      );

      const scriptTag = container.querySelector("script");
      expect(scriptTag).toBeInTheDocument();

      const jsonLd = JSON.parse(scriptTag?.textContent || "{}");
      expect(jsonLd).toEqual(expectedJsonLd);
    }
  );
});
