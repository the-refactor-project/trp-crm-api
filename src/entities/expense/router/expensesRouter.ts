import { Router } from "express";
import Repository from "../../../repository/Repository.js";
import Controller from "../../../controller/Controller.js";
import { ExpenseEntity, ExpenseEntityData } from "../ExpenseEntity.js";
import Expense from "../model/Expense.js";

const expensesRouter = Router();

const expensesRepository = new Repository<ExpenseEntity, ExpenseEntityData>(
  Expense,
  "Expense",
);
const expensesController = new Controller<ExpenseEntity, ExpenseEntityData>(
  expensesRepository,
  {
    singular: "Expense",
    plural: "Expenses",
  },
);

expensesRouter.get("/", expensesController.get);
expensesRouter.get("/:id", expensesController.getById);
expensesRouter.post("/", expensesController.add);
expensesRouter.put("/", expensesController.updateById);
expensesRouter.delete("/:id", expensesController.deleteById);

export default expensesRouter;
