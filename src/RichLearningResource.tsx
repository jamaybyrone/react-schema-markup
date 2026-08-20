import { LearningResource, WithContext } from "schema-dts";
import React, { FC } from "react";
import { RichLearningResourceProps } from "@/types/learningResource";
import JsonLd from "./JsonLd";

const RichLearningResource: FC<RichLearningResourceProps> = ({
  resource,
  ScriptWrap,
}) => {
  const {
    name,
    url,
    description,
    resourceType = "LearningResource",
    educationalLevel,
    learningResourceType,
    about,
    assesses,
  } = resource;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": resourceType,
    name,
    url,
    description,
    educationalLevel,
    learningResourceType,
    about,
    assesses,
  } as WithContext<LearningResource>;

  return <JsonLd data={jsonLd} ScriptWrap={ScriptWrap} />;
};

export default RichLearningResource;
