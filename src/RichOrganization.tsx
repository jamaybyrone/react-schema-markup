import { Organization as Org, WithContext } from "schema-dts";
import React, { FC } from "react";
import { RichOrganizationProps } from "@/types/organization";
import JsonLd from "./JsonLd";

const RichOrganization: FC<RichOrganizationProps> = ({
  organization,
  ScriptWrap,
}) => {
  const {
    name,
    alternateName,
    description,
    url,
    logo,
    address,
    email,
    sameAs = [],
  } = organization;

  const jsonLd: WithContext<Org> = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name,
    alternateName,
    description,
    url,
    logo,
    address: {
      "@type": "PostalAddress",
      streetAddress: address.streetAddress,
      addressLocality: address.addressLocality,
      postalCode: address.postalCode,
    },
    email,
    sameAs,
  };

  return <JsonLd data={jsonLd} ScriptWrap={ScriptWrap} />;
};

export default RichOrganization;
