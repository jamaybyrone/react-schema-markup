"use client";

import { ImageObject, WithContext } from "schema-dts";
import React, { FC } from "react";
import { RichPhotoProps } from "@/types/photos";

const RichPhotos: FC<RichPhotoProps> = ({ photo, ScriptWrap }) => {
  const {
    contentUrl,
    creditText,
    license,
    acquireLicensePage,
    copyrightNotice,
    creatorName,
  } = photo;
  const Wrapper = ScriptWrap ?? "script";
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
    <Wrapper type="application/ld+json">
      {JSON.stringify(jsonLd, null, 2)}
    </Wrapper>
  );
};

export default RichPhotos;
