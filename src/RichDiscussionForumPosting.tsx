import { DiscussionForumPosting, WithContext } from "schema-dts";
import React, { FC } from "react";
import { RichDiscussionForumPostingProps } from "@/types/discussionForumPosting";
import JsonLd from "./JsonLd";

const RichDiscussionForumPosting: FC<RichDiscussionForumPostingProps> = ({
  posting,
  ScriptWrap,
}) => {
  const {
    url,
    text,
    headline,
    authorName,
    datePublished,
    upvoteCount,
    commentCount,
  } = posting;

  const interactionStatistic = [
    ...(upvoteCount !== undefined
      ? [
          {
            "@type": "InteractionCounter",
            interactionType: "https://schema.org/LikeAction",
            userInteractionCount: upvoteCount,
          },
        ]
      : []),
    ...(commentCount !== undefined
      ? [
          {
            "@type": "InteractionCounter",
            interactionType: "https://schema.org/CommentAction",
            userInteractionCount: commentCount,
          },
        ]
      : []),
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "DiscussionForumPosting",
    url,
    text,
    headline,
    datePublished,
    author: {
      "@type": "Person",
      name: authorName,
    },
    interactionStatistic:
      interactionStatistic.length > 0 ? interactionStatistic : undefined,
  } as WithContext<DiscussionForumPosting>;

  return <JsonLd data={jsonLd} ScriptWrap={ScriptWrap} />;
};

export default RichDiscussionForumPosting;
