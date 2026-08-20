import { ProfilePage, WithContext } from "schema-dts";
import React, { FC } from "react";
import { RichProfilePageProps } from "@/types/profilePage";
import JsonLd from "./JsonLd";

const RichProfilePage: FC<RichProfilePageProps> = ({ profile, ScriptWrap }) => {
  const {
    url,
    personName,
    personImage,
    personUrl,
    description,
    dateCreated,
    interactionCount,
    interactionType = "FollowAction",
  } = profile;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    url,
    dateCreated,
    mainEntity: {
      "@type": "Person",
      name: personName,
      image: personImage,
      url: personUrl,
      description,
      interactionStatistic: interactionCount && {
        "@type": "InteractionCounter",
        interactionType: `https://schema.org/${interactionType}`,
        userInteractionCount: interactionCount,
      },
    },
  } as WithContext<ProfilePage>;

  return <JsonLd data={jsonLd} ScriptWrap={ScriptWrap} />;
};

export default RichProfilePage;
