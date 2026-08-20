import { ElementType } from "react";

export interface ArticleType {
  headline: string;
  description?: string;
  image: string | string[];
  authorName: string;
  authorUrl?: string;
  publisherName: string;
  publisherLogo: string;
  datePublished: string;
  dateModified?: string;
  url: string;
  articleType?: "Article" | "BlogPosting" | "NewsArticle";
}

export interface RichArticleProps {
  article: ArticleType;
  ScriptWrap?: ElementType;
}
