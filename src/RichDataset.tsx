import { Dataset, WithContext } from "schema-dts";
import React, { FC } from "react";
import { RichDatasetProps } from "@/types/dataset";
import JsonLd from "./JsonLd";

const RichDataset: FC<RichDatasetProps> = ({ dataset, ScriptWrap }) => {
  const {
    name,
    description,
    url,
    keywords,
    license,
    creatorName,
    creatorUrl,
    datePublished,
    spatialCoverage,
  } = dataset;

  const jsonLd: WithContext<Dataset> = {
    "@context": "https://schema.org",
    "@type": "Dataset",
    name,
    description,
    url,
    keywords,
    license,
    creator: {
      "@type": "Person",
      name: creatorName,
      url: creatorUrl,
    },
    datePublished,
    spatialCoverage,
  };

  return <JsonLd data={jsonLd} ScriptWrap={ScriptWrap} />;
};

export default RichDataset;
