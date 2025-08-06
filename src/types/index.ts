export type Planning = {
  id: string;
  title: string;
  description: string;
  dateStart: string;
  dateEnd: string;
  users: string[];
  events: Event[];
};

export type Event = {
  id: string;
  title: string;
  description: string;
  dateStart: string;
  dateEnd: string;
  location: string;
  participants: string[];
};
