import "@testing-library/jest-dom";

import React from "react";
import { render } from "@testing-library/react";

import RichProfilePage from "../src/RichProfilePage";
import { RichProfilePageProps } from "../src/types/profilePage";

interface TestCase {
  scenario: string;
  props: RichProfilePageProps;
  expectedJsonLd: object;
}

const testCases: TestCase[] = [
  {
    scenario: "renders JSON-LD for a profile page with follower count",
    props: {
      profile: {
        url: "https://casabonita.com/profiles/chip",
        personName: "Chip McElroy",
        personImage: "https://casabonita.com/profiles/chip.jpg",
        dateCreated: "2020-05-01",
        interactionCount: 4200,
      },
    },
    expectedJsonLd: {
      "@context": "https://schema.org",
      "@type": "ProfilePage",
      url: "https://casabonita.com/profiles/chip",
      dateCreated: "2020-05-01",
      mainEntity: {
        "@type": "Person",
        name: "Chip McElroy",
        image: "https://casabonita.com/profiles/chip.jpg",
        interactionStatistic: {
          "@type": "InteractionCounter",
          interactionType: "https://schema.org/FollowAction",
          userInteractionCount: 4200,
        },
      },
    },
  },
];

const setup = (props: RichProfilePageProps) => {
  return render(<RichProfilePage {...props} />);
};

describe("RichProfilePage", () => {
  it.each(testCases)("$scenario", ({ props, expectedJsonLd }) => {
    const { container } = setup(props);
    const scriptTag = container.querySelector("script");

    const jsonLd = JSON.parse(scriptTag?.textContent || "{}");
    expect(jsonLd).toEqual(expect.objectContaining(expectedJsonLd));
  });
});
