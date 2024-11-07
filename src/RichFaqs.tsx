import { FAQPage, WithContext } from "schema-dts";
import { FaqProps } from "@/types/faqs";
import React, { FC } from "react";

const RichFaqs: FC<FaqProps> = ({ questions, ScriptWrap }) => {
  const Wrapper = ScriptWrap ?? "script";
  const jsonLd: WithContext<FAQPage> = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: questions,
  };

  return (
    <Wrapper id="FAQStructure" type="application/ld+json">
      {JSON.stringify(jsonLd, null, 2)}
    </Wrapper>
  );
};

export default RichFaqs;
