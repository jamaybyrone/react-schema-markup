// src/components/RichProduct.tsx

import { Product, Offer, WithContext } from "schema-dts";
import React, { FC } from "react";
import { RichProductProps } from "../types/product";
const RichProduct: FC<RichProductProps> = ({
  name,
  description,
  sku,
  brand,
  price,
  currency,
  url,
  image,
  availability,
  offersUrl,
  sellerName,
}) => {
  const jsonLd: WithContext<Product> = {
    "@context": "https://schema.org",
    "@type": "Product",
    name,
    description,
    sku,
    brand: {
      "@type": "Brand",
      name: brand,
    },
    offers: {
      "@type": "Offer",
      url: offersUrl ?? url,
      priceCurrency: currency,
      price: price,
      itemCondition: "https://schema.org/NewCondition",
      availability: `https://schema.org/${availability}`,
      seller: {
        "@type": "Organization",
        name: sellerName,
      },
    } as Offer,
    image,
    url,
  };

  return (
    <script id="ProductStructure" type="application/ld+json">
      {JSON.stringify(jsonLd, null, 2)}
    </script>
  );
};

export default RichProduct;
