import { ElementType } from "react";

export interface PhotoType {
  contentUrl: string;
  creditText: string;
  license?: string;
  acquireLicensePage?: string;
  copyrightNotice?: string;
  creatorName?: string;
}

export interface RichPhotoProps {
  photo: PhotoType;
  ScriptWrap?: ElementType;
}
