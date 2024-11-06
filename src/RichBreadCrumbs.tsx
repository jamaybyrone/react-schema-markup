"use client";

import { WithContext, BreadcrumbList, ListItem } from "schema-dts";
import React, { FC } from "react";
import { BreadcrumbItem, RichBreadCrumbDataProps } from "@/types/breadcrumb";

const RichBreadCrumbs: FC<RichBreadCrumbDataProps> = ({
  supportedLocales = ["en", "fr", "es", "de"],
  includeTrailingSlash = false,
}) => {
  if (typeof window === "undefined") {
    return null;
  }

  const { origin, pathname } = window.location;
  const pathSegments = pathname
    .split("/")
    .filter((segment) => segment.length > 0);

  const hasLocale =
    pathSegments.length > 0 && supportedLocales.includes(pathSegments[0]);
  const baseIndex = hasLocale ? 1 : 0;

  const breadcrumbs: BreadcrumbItem[] = pathSegments
    .slice(baseIndex)
    .map((segment, index) => {
      const name = segment
        .replace(/-/g, " ")
        .replace(/\b\w/g, (char) => char.toUpperCase());
      const url = `${origin}/${pathSegments
        .slice(0, baseIndex + index + 1)
        .join("/")}${includeTrailingSlash ? "/" : ""}`;
      return { name, url };
    });

  breadcrumbs.unshift({
    name: "Home",
    url: origin + (includeTrailingSlash ? "/" : ""),
  });

  const jsonLd: WithContext<BreadcrumbList> = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: breadcrumbs.map(
      (item, index): ListItem => ({
        "@type": "ListItem",
        position: index + 1,
        name: item.name,
        item: item.url,
      })
    ),
  };

  return (
    <script id="BreadCrumbStructure" type="application/ld+json">
      {JSON.stringify(jsonLd, null, 2)}
    </script>
  );
};

export default RichBreadCrumbs;
