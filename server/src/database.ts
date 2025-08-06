import { JSONFilePreset } from "lowdb/node";

import { Planning, User } from "./types";

type Data = {
  users: { email: string; name: string }[];
  plannings: Planning[];
};

export const defaultData: Data = {
  plannings: [
    {
      id: "123",
      title: "Excursion US",
      description: "Petite balade aux US",
      dateStart: "2023-10-01T10:00:00Z",
      dateEnd: "2023-10-01T12:00:00Z",
      users: [],
      events: [
        {
          id: "event1",
          title: "Event 1",
          description: "Description of Event 1",
          dateStart: "2023-10-01T10:00:00Z",
          dateEnd: "2023-10-01T12:00:00Z",
          location: "Location 1",
          participants: ["user1", "user2"],
        },
      ],
    },
    {
      id: "124",
      title: "Séminaire truc",
      description: "Avec la boîte",
      dateStart: "2023-10-01T10:00:00Z",
      dateEnd: "2023-10-01T12:00:00Z",
      users: [],
      events: [
        {
          id: "event1",
          title: "Event 1",
          description: "Description of Event 1",
          dateStart: "2023-10-01T10:00:00Z",
          dateEnd: "2023-10-01T12:00:00Z",
          location: "Location 1",
          participants: ["user1", "user2"],
        },
      ],
    },
    {
      id: "125",
      title: "Anniversaire Machin",
      description: "Acheter un beau kdo",
      dateStart: "2023-10-01T10:00:00Z",
      dateEnd: "2023-10-01T12:00:00Z",
      users: [],
      events: [
        {
          id: "event1",
          title: "Event 1",
          description: "Description of Event 1",
          dateStart: "2023-10-01T10:00:00Z",
          dateEnd: "2023-10-01T12:00:00Z",
          location: "Location 1",
          participants: ["user1", "user2"],
        },
      ],
    },
  ],
  users: [],
};

const db = await JSONFilePreset("db.json", defaultData);
await db.write();

export const getData = async () => {
  const db = await JSONFilePreset("db.json", defaultData);
  return db.data;
};

export const getPlannings = async () => {
  const db = await JSONFilePreset("db.json", defaultData);
  return db.data.plannings;
};

export const getPlanning = async (id: string) => {
  const db = await JSONFilePreset("db.json", defaultData);
  const planning = db.data.plannings.find((p) => p.id === id);
  if (!planning) {
    throw new Error(`Planning with id ${id} not found`);
  }
  return planning;
};

export const addUser = async (user: { email: string; name: string }) => {
  const db = await JSONFilePreset("db.json", defaultData);
  db.data.users.push(user);
  await db.write();
};

export const getUserFromEmail = async (email: string) => {
  const db = await JSONFilePreset("db.json", defaultData);
  return db.data.users.find((user) => user.email === email);
};

export const addUserToPlanning = async (user: User, planning: Planning) => {
  const db = await JSONFilePreset("db.json", defaultData);
  const planningIndex = db.data.plannings.findIndex(
    (p) => p.id === planning.id,
  );

  planning.users.push(user);
  db.data.plannings[planningIndex] = planning;
  await db.write();
};
