import { Router } from "express";
import Provider from "../model/Provider.js";
import Repository from "../../../repository/Repository.js";
import { ProviderEntity, ProviderEntityData } from "../ProviderEntity.js";
import ProvidersController from "../controller/ProvidersController.js";

const providersRouter = Router();

const providersRepository = new Repository<ProviderEntity, ProviderEntityData>(
  Provider,
  "Provider",
);
const providersController = new ProvidersController(providersRepository, {
  singular: "Provider",
  plural: "Providers",
});

providersRouter.get("/", providersController.get);
providersRouter.get("/start/:start", providersController.getByStart);
providersRouter.get("/:id", providersController.getById);
providersRouter.post("/", providersController.add);
providersRouter.put("/", providersController.updateById);
providersRouter.delete("/:id", providersController.deleteById);

export default providersRouter;
