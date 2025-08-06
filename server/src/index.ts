import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import {
  getPlannings,
  addUser,
  getPlanning,
  getUserFromEmail,
  addUserToPlanning,
} from "./database";

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.get("/api/hello", (_req, res) => {
  res.json({ message: "Hello from backend!" });
});

app.get("/plannings", async (req, res) => {
  const plannings = await getPlannings();

  res.json(plannings);
});

app.get("/planning/:id", async (req, res) => {
  const { id } = req.params;

  const plannings = await getPlannings();
  const planning = plannings.find((p) => p.id === id);

  if (!planning) {
    return res.status(404).json({ error: "Planning not found" });
  }

  res.json(planning);
});

app.post("/user", async (req, res) => {
  const { name, email } = req.body;

  if (!name || !email) {
    return res.status(400).json({ error: "Name and email are required" });
  }

  await addUser({ name, email });

  res.status(201).json({ message: "User added successfully" });
});

app.post("/planning/:planningId/add-user", async (req, res) => {
  const { planningId } = req.params;
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ error: "Email is required" });
  }

  const planning = await getPlanning(planningId);
  if (!planning) {
    return res.status(404).json({ error: "Planning not found" });
  }

  const user = await getUserFromEmail(email);
  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  await addUserToPlanning(user, planning);

  res.status(200).json({ message: "User added to planning successfully" });
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
