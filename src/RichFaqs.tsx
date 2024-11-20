import { FAQPage, WithContext } from "schema-dts";
import { FaqProps } from "@/types/faqs";
import React, { FC } from "react";

const RichFaqs: FC<FaqProps> = ({ faqs, ScriptWrap }) => {
  const Wrapper = ScriptWrap ?? "script";
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

  return (
    <Wrapper type="application/ld+json">
      {JSON.stringify(jsonLd, null, 2)}
    </Wrapper>
  );
};

export default RichFaqs;
