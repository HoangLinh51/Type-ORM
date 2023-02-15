import * as express from "express";
import { Request, Response } from "express";
import { User } from "./entity/user";
import { AppDataSource } from "./conectdb";

// establish database connection
AppDataSource.initialize()
  .then(() => {
    console.log("Data Source has been initialized!");
  })
  .catch((err) => {
    console.error("Error during Data Source initialization:", err);
  });

// create and setup express app
const app = express();
app.use(express.json());

// register routes
app.get("/users", async function (req: Request, res: Response) {
  const users = await AppDataSource.getRepository(User).find();
  res.json(users);
});

app.get("/users/:id", async function (req: Request, res: Response) {
  const abc = req.params.id;
  const results = await AppDataSource.getRepository(User).findOneBy({
    id: Number(abc),
  });
  return res.send(results);
});

app.post("/users", async function (req: Request, res: Response) {
  const user = await AppDataSource.getRepository(User).create(req.body);
  const results = await AppDataSource.getRepository(User).save(user);
  return res.send(results);
});

app.post("/users/login", async function (req: Request, res: Response) {
  const body: { email: string; password: string } = req.body;
  const user = await AppDataSource.getRepository(User)
    .createQueryBuilder("u")
    .where("u.email = :email", { email: body.email })
    .andWhere("u.password = :password", { password: body.password })
    .getOne();

  if (user && user.id > 0) {
    return res.status(200).json({
      user: user,
    });
  }
  return res.status(400).json({
    message: "Login failed",
  });
});

app.put("/users/:id", async function (req: Request, res: Response) {
  const id = req.params.id;
  const user = await AppDataSource.getRepository(User).findOneBy({
    id: Number(id),
  });
  AppDataSource.getRepository(User).merge(user, req.body);
  const results = await AppDataSource.getRepository(User).save(user);
  return res.send(results);
});

app.delete("/users/:id", async function (req: Request, res: Response) {
  const results = await AppDataSource.getRepository(User).delete(req.params.id);
  return res.send(results);
});

// start express server
app.listen(3300);
