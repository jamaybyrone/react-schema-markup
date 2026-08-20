import { ElementType } from "react";

export interface JobPostingType {
  title: string;
  description: string;
  datePosted: string;
  validThrough?: string;
  hiringOrganizationName: string;
  hiringOrganizationUrl?: string;
  hiringOrganizationLogo?: string;
  employmentType?: string;
  remote?: boolean;
  jobLocation?: {
    streetAddress?: string;
    addressLocality: string;
    addressRegion?: string;
    postalCode?: string;
    addressCountry: string;
  };
  baseSalary?: {
    currency: string;
    value: number;
    unitText?: "HOUR" | "DAY" | "WEEK" | "MONTH" | "YEAR";
  };
}

export interface RichJobPostingProps {
  job: JobPostingType;
  ScriptWrap?: ElementType;
}
