import { SoftwareApplication, WithContext } from "schema-dts";
import React, { FC } from "react";
import { RichSoftwareApplicationProps } from "@/types/softwareApplication";
import JsonLd from "./JsonLd";

const RichSoftwareApplication: FC<RichSoftwareApplicationProps> = ({
  app,
  ScriptWrap,
}) => {
  const {
    name,
    operatingSystem,
    applicationCategory,
    description,
    image,
    url,
    price,
    currency = "USD",
    ratingValue,
    ratingCount,
    bestRating = 5,
    worstRating = 1,
  } = app;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name,
    operatingSystem,
    applicationCategory,
    description,
    image,
    url,
    offers: price && {
      "@type": "Offer",
      price,
      priceCurrency: currency,
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue,
      ratingCount,
      bestRating,
      worstRating,
    },
  } as WithContext<SoftwareApplication>;

  return <JsonLd data={jsonLd} ScriptWrap={ScriptWrap} />;
};

export default RichSoftwareApplication;
