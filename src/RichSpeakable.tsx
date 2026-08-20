import { WebPage, WithContext } from "schema-dts";
import React, { FC } from "react";
import { RichSpeakableProps } from "@/types/speakable";
import JsonLd from "./JsonLd";

const RichSpeakable: FC<RichSpeakableProps> = ({ speakable, ScriptWrap }) => {
  const { url, name, cssSelectors } = speakable;

  const jsonLd: WithContext<WebPage> = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    url,
    name,
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: cssSelectors,
    },
  };

  return <JsonLd data={jsonLd} ScriptWrap={ScriptWrap} />;
};

export default RichSpeakable;
