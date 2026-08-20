import { ElementType } from "react";

export interface ClaimReviewType {
  url: string;
  claimReviewed: string;
  authorName: string;
  authorUrl?: string;
  datePublished?: string;
  claimAuthorName?: string;
  claimDatePublished?: string;
  ratingValue: number;
  bestRating?: number;
  worstRating?: number;
  alternateName: string;
}

export interface RichClaimReviewProps {
  claimReview: ClaimReviewType;
  ScriptWrap?: ElementType;
}
