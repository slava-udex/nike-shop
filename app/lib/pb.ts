import PocketBase from "pocketbase";

export const pb = new PocketBase("http://localhost:8090");

// Login as an admin
await pb.admins.authWithPassword(
  process.env.POCKETBASE_EMAIL!,
  process.env.POCKETBASE_PASSWORD!
);
