export interface OrganizationType {
  name: string;
  alternateName?: string;
  description: string;
  url: string;
  logo: string;
  address: {
    streetAddress: string;
    addressLocality: string;
    postalCode: string;
  };
  email: string;
  sameAs?: string[];
}

export interface RichOrganizationProps {
  organization: OrganizationType;
}
