import { ElementType } from "react";

export interface ReviewType {
  itemReviewedName: string;
  itemReviewedType?: string;
  itemReviewedUrl?: string;
  itemReviewedImage?: string;
  authorName: string;
  reviewBody?: string;
  datePublished?: string;
  ratingValue: number;
  bestRating?: number;
  worstRating?: number;
}

export interface RichReviewProps {
  review: ReviewType;
  ScriptWrap?: ElementType;
}
