import { ElementType } from "react";

export interface DiscussionForumPostingType {
  url: string;
  text: string;
  headline?: string;
  authorName: string;
  datePublished: string;
  upvoteCount?: number;
  commentCount?: number;
}

export interface RichDiscussionForumPostingProps {
  posting: DiscussionForumPostingType;
  ScriptWrap?: ElementType;
}
