import { ElementType } from "react";

export interface SoftwareApplicationType {
  name: string;
  operatingSystem: string;
  applicationCategory: string;
  description?: string;
  image?: string;
  url?: string;
  price?: string;
  currency?: string;
  ratingValue: number;
  ratingCount: number;
  bestRating?: number;
  worstRating?: number;
}

export interface RichSoftwareApplicationProps {
  app: SoftwareApplicationType;
  ScriptWrap?: ElementType;
}
