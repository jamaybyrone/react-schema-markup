import { ElementType } from "react";

export interface CourseType {
  name: string;
  description: string;
  providerName: string;
  providerUrl?: string;
  courseCode?: string;
  price?: string;
  currency?: string;
  ratingValue?: number;
  ratingCount?: number;
}

export interface RichCourseProps {
  course: CourseType;
  ScriptWrap?: ElementType;
}
