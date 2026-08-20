import { ElementType } from "react";

export interface SpeakableType {
  url: string;
  name?: string;
  cssSelectors: string[];
}

export interface RichSpeakableProps {
  speakable: SpeakableType;
  ScriptWrap?: ElementType;
}
