import { Router } from "express";
import Provider from "../model/Provider.js";
import Repository from "../../../repository/Repository.js";
import { ProviderEntity, ProviderEntityData } from "../ProviderEntity.js";
import Controller from "../../../controller/Controller.js";

const providersRouter = Router();

const providersRepository = new Repository<ProviderEntity, ProviderEntityData>(
  Provider,
  "Provider",
);
const providersController = new Controller<ProviderEntity, ProviderEntityData>(
  providersRepository,
  {
    singular: "Provider",
    plural: "Providers",
  },
);

providersRouter.get("/", providersController.get);
providersRouter.get("/:id", providersController.getById);
providersRouter.post("/", providersController.add);
providersRouter.put("/", providersController.updateById);
providersRouter.delete("/:id", providersController.deleteById);

export default providersRouter;
