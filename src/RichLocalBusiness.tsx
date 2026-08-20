import { LocalBusiness, WithContext } from "schema-dts";
import React, { FC } from "react";
import { RichLocalBusinessProps } from "@/types/localBusiness";
import JsonLd from "./JsonLd";

const RichLocalBusiness: FC<RichLocalBusinessProps> = ({
  business,
  ScriptWrap,
}) => {
  const {
    name,
    businessType = "LocalBusiness",
    description,
    url,
    telephone,
    image,
    priceRange,
    address,
    geo,
    openingHours,
    sameAs = [],
  } = business;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": businessType,
    name,
    description,
    url,
    telephone,
    image,
    priceRange,
    address: {
      "@type": "PostalAddress",
      streetAddress: address.streetAddress,
      addressLocality: address.addressLocality,
      addressRegion: address.addressRegion,
      postalCode: address.postalCode,
      addressCountry: address.addressCountry,
    },
    geo: geo && {
      "@type": "GeoCoordinates",
      latitude: geo.latitude,
      longitude: geo.longitude,
    },
    openingHours,
    sameAs,
  } as WithContext<LocalBusiness>;

  return <JsonLd data={jsonLd} ScriptWrap={ScriptWrap} />;
};

export default RichLocalBusiness;
