import { FAQPage, WithContext } from "schema-dts";
import { FaqProps } from "@/types/faqs";
import React, { FC } from "react";
import JsonLd from "./JsonLd";

const RichFaqs: FC<FaqProps> = ({ faqs, ScriptWrap }) => {
  const formattedQuestions = faqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: faq.answer,
    },
  }));
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: formattedQuestions,
  } as WithContext<FAQPage>;

  return <JsonLd data={jsonLd} ScriptWrap={ScriptWrap} />;
};

export default RichFaqs;
