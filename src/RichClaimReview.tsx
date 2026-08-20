import { ClaimReview, WithContext } from "schema-dts";
import React, { FC } from "react";
import { RichClaimReviewProps } from "@/types/claimReview";
import JsonLd from "./JsonLd";

const RichClaimReview: FC<RichClaimReviewProps> = ({
  claimReview,
  ScriptWrap,
}) => {
  const {
    url,
    claimReviewed,
    authorName,
    authorUrl,
    datePublished,
    claimAuthorName,
    claimDatePublished,
    ratingValue,
    bestRating = 5,
    worstRating = 1,
    alternateName,
  } = claimReview;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ClaimReview",
    url,
    claimReviewed,
    datePublished,
    author: {
      "@type": "Organization",
      name: authorName,
      url: authorUrl,
    },
    itemReviewed: {
      "@type": "Claim",
      author: claimAuthorName && {
        "@type": "Person",
        name: claimAuthorName,
      },
      datePublished: claimDatePublished,
    },
    reviewRating: {
      "@type": "Rating",
      ratingValue,
      bestRating,
      worstRating,
      alternateName,
    },
  } as WithContext<ClaimReview>;

  return <JsonLd data={jsonLd} ScriptWrap={ScriptWrap} />;
};

export default RichClaimReview;
