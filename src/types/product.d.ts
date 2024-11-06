export interface ProductType {
  name: string;
  description: string;
  sku?: string;
  brand: string;
  price: string;
  currency: string;
  url: string;
  image: string;
  availability: "InStock" | "OutOfStock";
  offersUrl?: string;
  sellerName: string;
}

export interface RichProductProps {
  product: ProductType;
}
