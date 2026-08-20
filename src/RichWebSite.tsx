import { WebSite, WithContext } from "schema-dts";
import React, { FC } from "react";
import { RichWebSiteProps } from "@/types/website";
import JsonLd from "./JsonLd";

const RichWebSite: FC<RichWebSiteProps> = ({ website, ScriptWrap }) => {
  const { name, url, searchUrlTemplate } = website;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name,
    url,
    potentialAction: searchUrlTemplate && {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: searchUrlTemplate,
      },
      "query-input": "required name=search_term_string",
    },
  } as WithContext<WebSite>;

  return <JsonLd data={jsonLd} ScriptWrap={ScriptWrap} />;
};

export default RichWebSite;
