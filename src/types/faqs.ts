import { ElementType } from "react";

export interface FaqEntity {
  question: string;
  answer: string;
}

export interface FaqProps {
  faqs: FaqEntity[];
  ScriptWrap?: ElementType;
}
