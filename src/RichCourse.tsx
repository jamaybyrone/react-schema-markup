import { Course, WithContext } from "schema-dts";
import React, { FC } from "react";
import { RichCourseProps } from "@/types/course";
import JsonLd from "./JsonLd";

const RichCourse: FC<RichCourseProps> = ({ course, ScriptWrap }) => {
  const {
    name,
    description,
    providerName,
    providerUrl,
    courseCode,
    price,
    currency = "USD",
    ratingValue,
    ratingCount,
  } = course;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Course",
    name,
    description,
    courseCode,
    provider: {
      "@type": "Organization",
      name: providerName,
      sameAs: providerUrl,
    },
    offers: price && {
      "@type": "Offer",
      price,
      priceCurrency: currency,
    },
    aggregateRating: ratingValue &&
      ratingCount && {
        "@type": "AggregateRating",
        ratingValue,
        ratingCount,
      },
  } as WithContext<Course>;

  return <JsonLd data={jsonLd} ScriptWrap={ScriptWrap} />;
};

export default RichCourse;
