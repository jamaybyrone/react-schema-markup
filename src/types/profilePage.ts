import { ElementType } from "react";

export interface ProfilePageType {
  url: string;
  personName: string;
  personImage?: string;
  personUrl?: string;
  description?: string;
  dateCreated?: string;
  interactionCount?: number;
  interactionType?: string;
}

export interface RichProfilePageProps {
  profile: ProfilePageType;
  ScriptWrap?: ElementType;
}
