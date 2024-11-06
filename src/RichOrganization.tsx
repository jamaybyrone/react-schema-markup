import { Organization as Org, WithContext } from "schema-dts";
import React, { FC } from "react";
import { RichOrganizationProps } from "@/types/organization";

const RichOrganization: FC<RichOrganizationProps> = ({ organization }) => {
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
    sameAs
  };

  return (
    <script id="OrgStructure" type="application/ld+json">
      {JSON.stringify(jsonLd, null, 2)}
    </script>
  );
};

export default RichOrganization;
