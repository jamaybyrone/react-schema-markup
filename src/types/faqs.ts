import { ElementType } from "react";

export interface FaqAcceptedAnswer {
  "@type": "Answer";
  text: string;
}

export interface FaqEntity {
  "@type": "Question";
  name: string;
  acceptedAnswer: FaqAcceptedAnswer;
}

export interface FaqProps {
  questions: FaqEntity[];
  ScriptWrap?: ElementType;
}
