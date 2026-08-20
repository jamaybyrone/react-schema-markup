import { ElementType } from "react";

export interface VideoType {
  name: string;
  description?: string;
  thumbnailUrl: string | string[];
  uploadDate: string;
  duration?: string;
  contentUrl?: string;
  embedUrl?: string;
}

export interface RichVideoProps {
  video: VideoType;
  ScriptWrap?: ElementType;
}
