import { FAQPage, WithContext } from "schema-dts";
import { FaqProps } from "@/types/faqs";
import React, { FC } from "react";

const RichFaqs: FC<FaqProps> = ({ questions }) => {
  const jsonLd: WithContext<FAQPage> = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: questions,
  };

  return (
    <script id="FAQStructure" type="application/ld+json">
      {JSON.stringify(jsonLd, null, 2)}
    </script>
  );
};

export default RichFaqs;
