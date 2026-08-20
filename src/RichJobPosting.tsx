import { JobPosting, WithContext } from "schema-dts";
import React, { FC } from "react";
import { RichJobPostingProps } from "@/types/jobPosting";
import JsonLd from "./JsonLd";

const RichJobPosting: FC<RichJobPostingProps> = ({ job, ScriptWrap }) => {
  const {
    title,
    description,
    datePosted,
    validThrough,
    hiringOrganizationName,
    hiringOrganizationUrl,
    hiringOrganizationLogo,
    employmentType,
    remote = false,
    jobLocation,
    baseSalary,
  } = job;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title,
    description,
    datePosted,
    validThrough,
    employmentType,
    hiringOrganization: {
      "@type": "Organization",
      name: hiringOrganizationName,
      sameAs: hiringOrganizationUrl,
      logo: hiringOrganizationLogo,
    },
    jobLocationType: remote ? "TELECOMMUTE" : undefined,
    jobLocation: jobLocation && {
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        streetAddress: jobLocation.streetAddress,
        addressLocality: jobLocation.addressLocality,
        addressRegion: jobLocation.addressRegion,
        postalCode: jobLocation.postalCode,
        addressCountry: jobLocation.addressCountry,
      },
    },
    baseSalary: baseSalary && {
      "@type": "MonetaryAmount",
      currency: baseSalary.currency,
      value: {
        "@type": "QuantitativeValue",
        value: baseSalary.value,
        unitText: baseSalary.unitText,
      },
    },
  } as WithContext<JobPosting>;

  return <JsonLd data={jsonLd} ScriptWrap={ScriptWrap} />;
};

export default RichJobPosting;
