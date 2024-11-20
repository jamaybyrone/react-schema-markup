import { Event, WithContext } from "schema-dts";
import React, { FC } from "react";
import { RichEventProps } from "@/types/event";

const RichEvent: FC<RichEventProps> = ({ event, ScriptWrap }) => {
  const {
    name,
    startDate,
    endDate,
    location,
    url,
    description,
    performer,
    organizer,
    image,
  } = event;

  const Wrapper = ScriptWrap ?? "script";

  const jsonLd: WithContext<Event> = {
    "@context": "https://schema.org",
    "@type": "Event",
    name,
    startDate,
    endDate,
    location: {
      "@type": "Place",
      name: location.name,
      address: location.address,
    },
    url,
    description,
    performer: performer && {
      "@type": "Person",
      name: performer.name,
    },
    image,
    organizer: organizer && {
      "@type": "Organization",
      name: organizer.name,
      url: organizer.url,
    },
  };

  return (
      <Wrapper id="EventStructure" type="application/ld+json">
        {JSON.stringify(jsonLd, null, 2)}
      </Wrapper>
  );
};

export default RichEvent;
