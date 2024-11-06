"use client"

import { ImageObject, WithContext } from "schema-dts";
import React, { FC } from "react";
import { RichPhotoProps } from "@/types/photos";

const RichPhotos: FC<RichPhotoProps> = ({photo}) => {

  const {
    contentUrl,
    creditText,
    license,
    acquireLicensePage,
    copyrightNotice,
    creatorName,
  } = photo
  const domain = typeof window !== "undefined" ? window.location.origin : "";

  const jsonLd: WithContext<ImageObject> = {
    "@context": "https://schema.org",
    "@type": "ImageObject",
    contentUrl,
    license: license ?? `${domain}/license`,
    acquireLicensePage: acquireLicensePage ?? `${domain}/license`,
    creditText,
    copyrightNotice,
    creator: {
      "@type": "Person",
      name: creatorName,
    },
  };

  return (
    <script id="ImageObjectStructure" type="application/ld+json">
      {JSON.stringify(jsonLd, null, 2)}
    </script>
  );
};

export default RichPhotos;
