import { ElementType } from "react";

export interface WebSiteType {
  name: string;
  url: string;
  searchUrlTemplate?: string;
}

export interface RichWebSiteProps {
  website: WebSiteType;
  ScriptWrap?: ElementType;
}
