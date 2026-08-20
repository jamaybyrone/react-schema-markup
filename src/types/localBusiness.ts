import { ElementType } from "react";

export interface LocalBusinessType {
  name: string;
  businessType?: string;
  description?: string;
  url: string;
  telephone?: string;
  image?: string;
  priceRange?: string;
  address: {
    streetAddress: string;
    addressLocality: string;
    addressRegion?: string;
    postalCode: string;
    addressCountry: string;
  };
  geo?: {
    latitude: number;
    longitude: number;
  };
  openingHours?: string[];
  sameAs?: string[];
}

export interface RichLocalBusinessProps {
  business: LocalBusinessType;
  ScriptWrap?: ElementType;
}
