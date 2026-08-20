import React, { ElementType, FC } from "react";

interface JsonLdProps {
  data: object;
  ScriptWrap?: ElementType;
}

const JsonLd: FC<JsonLdProps> = ({ data, ScriptWrap }) => {
  const Wrapper = ScriptWrap ?? "script";
  // Escape "<" so a field like "</script><script>" can't break out of the tag.
  const json = JSON.stringify(data, null, 2).replace(/</g, "\\u003c");

  return <Wrapper type="application/ld+json">{json}</Wrapper>;
};

export default JsonLd;
