import { Dataset, WithContext } from "schema-dts";
import React, { FC } from "react";
import { RichDatasetProps } from "@/types/dataset";

const RichDataset: FC<RichDatasetProps> = ({dataset}) => {
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
  } = dataset
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

  return (
    <script id="DatasetStructure" type="application/ld+json">
      {JSON.stringify(jsonLd, null, 2)}
    </script>
  );
};

export default RichDataset;
