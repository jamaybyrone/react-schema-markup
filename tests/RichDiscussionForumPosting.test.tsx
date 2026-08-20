import "@testing-library/jest-dom";

import React from "react";
import { render } from "@testing-library/react";

import RichDiscussionForumPosting from "../src/RichDiscussionForumPosting";
import { RichDiscussionForumPostingProps } from "../src/types/discussionForumPosting";

interface TestCase {
  scenario: string;
  props: RichDiscussionForumPostingProps;
  expectedJsonLd: object;
}

const testCases: TestCase[] = [
  {
    scenario: "renders JSON-LD for a forum post with upvotes and comments",
    props: {
      posting: {
        url: "https://casabonita.com/forum/posts/1",
        headline: "Best table for cliff-diving views?",
        text: "Asking for a friend who wants to watch, not dive.",
        authorName: "Chip McElroy",
        datePublished: "2026-01-20",
        upvoteCount: 42,
        commentCount: 7,
      },
    },
    expectedJsonLd: {
      "@context": "https://schema.org",
      "@type": "DiscussionForumPosting",
      url: "https://casabonita.com/forum/posts/1",
      headline: "Best table for cliff-diving views?",
      text: "Asking for a friend who wants to watch, not dive.",
      datePublished: "2026-01-20",
      author: {
        "@type": "Person",
        name: "Chip McElroy",
      },
      interactionStatistic: [
        {
          "@type": "InteractionCounter",
          interactionType: "https://schema.org/LikeAction",
          userInteractionCount: 42,
        },
        {
          "@type": "InteractionCounter",
          interactionType: "https://schema.org/CommentAction",
          userInteractionCount: 7,
        },
      ],
    },
  },
];

const setup = (props: RichDiscussionForumPostingProps) => {
  return render(<RichDiscussionForumPosting {...props} />);
};

describe("RichDiscussionForumPosting", () => {
  it.each(testCases)("$scenario", ({ props, expectedJsonLd }) => {
    const { container } = setup(props);
    const scriptTag = container.querySelector("script");

    const jsonLd = JSON.parse(scriptTag?.textContent || "{}");
    expect(jsonLd).toEqual(expect.objectContaining(expectedJsonLd));
  });
});
