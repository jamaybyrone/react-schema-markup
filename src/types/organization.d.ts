export interface RichOrganizationProps {
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
