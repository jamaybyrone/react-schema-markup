import { ElementType } from "react";

export interface LearningResourceType {
  name: string;
  url: string;
  description?: string;
  resourceType?: "LearningResource" | "Quiz";
  educationalLevel?: string;
  learningResourceType?: string;
  about?: string;
  assesses?: string;
}

export interface RichLearningResourceProps {
  resource: LearningResourceType;
  ScriptWrap?: ElementType;
}
