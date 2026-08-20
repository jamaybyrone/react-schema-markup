import { VideoObject, WithContext } from "schema-dts";
import React, { FC } from "react";
import { RichVideoProps } from "@/types/video";
import JsonLd from "./JsonLd";

const RichVideo: FC<RichVideoProps> = ({ video, ScriptWrap }) => {
  const {
    name,
    description,
    thumbnailUrl,
    uploadDate,
    duration,
    contentUrl,
    embedUrl,
  } = video;

  const jsonLd: WithContext<VideoObject> = {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name,
    description,
    thumbnailUrl,
    uploadDate,
    duration,
    contentUrl,
    embedUrl,
  };

  return <JsonLd data={jsonLd} ScriptWrap={ScriptWrap} />;
};

export default RichVideo;
