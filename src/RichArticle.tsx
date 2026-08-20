import { Article, WithContext } from "schema-dts";
import React, { FC } from "react";
import { RichArticleProps } from "@/types/article";
import JsonLd from "./JsonLd";

const RichArticle: FC<RichArticleProps> = ({ article, ScriptWrap }) => {
  const {
    headline,
    description,
    image,
    authorName,
    authorUrl,
    publisherName,
    publisherLogo,
    datePublished,
    dateModified,
    url,
    articleType = "Article",
  } = article;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": articleType,
    headline,
    description,
    image,
    author: {
      "@type": "Person",
      name: authorName,
      url: authorUrl,
    },
    publisher: {
      "@type": "Organization",
      name: publisherName,
      logo: {
        "@type": "ImageObject",
        url: publisherLogo,
      },
    },
    datePublished,
    dateModified: dateModified ?? datePublished,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
    url,
  } as WithContext<Article>;

  return <JsonLd data={jsonLd} ScriptWrap={ScriptWrap} />;
};

export default RichArticle;
