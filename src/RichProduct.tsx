import { Product, Offer, WithContext } from "schema-dts";
import React, { FC } from "react";
import { RichProductProps } from "@/types/product";

const RichProduct: FC<RichProductProps> = ({ product, ScriptWrap }) => {
  const {
    name,
    description,
    sku,
    brand,
    price,
    currency = "USD", // Default currency if not provided
    url,
    image,
    availability = "InStock", // Default to "InStock" if not provided
    offersUrl,
    sellerName = "Default Seller", // Default seller name if not provided
  } = product;

  // Structured data in JSON-LD format
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
  const Wrapper = ScriptWrap ?? "script";

  return (
    <Wrapper id="ProductStructure" type="application/ld+json">
      {JSON.stringify(jsonLd, null, 2)}
    </Wrapper>
  );
};

export default RichProduct;
