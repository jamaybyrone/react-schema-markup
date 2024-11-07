import { Organization as Org, WithContext } from "schema-dts";
import React, { FC } from "react";
import { RichOrganizationProps } from "@/types/organization";

const RichOrganization: FC<RichOrganizationProps> = ({
  organization,
  ScriptWrap,
}) => {
  const Wrapper = ScriptWrap ?? "script";
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

  return (
    <Wrapper id="OrgStructure" type="application/ld+json">
      {JSON.stringify(jsonLd, null, 2)}
    </Wrapper>
  );
};

export default RichOrganization;
