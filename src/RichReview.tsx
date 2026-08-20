import { Review, WithContext } from "schema-dts";
import React, { FC } from "react";
import { RichReviewProps } from "@/types/review";
import JsonLd from "./JsonLd";

const RichReview: FC<RichReviewProps> = ({ review, ScriptWrap }) => {
  const {
    itemReviewedName,
    itemReviewedType = "Product",
    itemReviewedUrl,
    itemReviewedImage,
    authorName,
    reviewBody,
    datePublished,
    ratingValue,
    bestRating = 5,
    worstRating = 1,
  } = review;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Review",
    itemReviewed: {
      "@type": itemReviewedType,
      name: itemReviewedName,
      url: itemReviewedUrl,
      image: itemReviewedImage,
    },
    author: {
      "@type": "Person",
      name: authorName,
    },
    reviewBody,
    datePublished,
    reviewRating: {
      "@type": "Rating",
      ratingValue,
      bestRating,
      worstRating,
    },
  } as WithContext<Review>;

  return <JsonLd data={jsonLd} ScriptWrap={ScriptWrap} />;
};

export default RichReview;
