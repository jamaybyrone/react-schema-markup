export interface RichEventType {
  name: string;
  startDate: string;
  endDate?: string;
  location: {
    name: string;
    address: string;
  };
  url: string;
  description?: string;
  performer?: {
    name: string;
  };
  organizer?: {
    name: string;
    url: string;
  };
}

export interface RichEventProps {
  event: RichEventType;
}
