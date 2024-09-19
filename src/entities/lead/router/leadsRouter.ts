import path from "node:path";
import { Router } from "express";
import multer from "multer";
import Lead from "../model/Lead.js";
import LeadsController from "../controller/LeadsController.js";
import Upload from "../../../upload/Upload.js";
import LeadsRepository from "../repository/LeadsRepository.js";

const upload = Upload.getInstance();

const storage = multer.diskStorage({
  destination: upload.getDir(),
  filename: function (_req, file, callback) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    callback(
      null,
      file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname),
    );
  },
});

const multerUpload = multer({ storage });

const leadsRouter = Router();

const leadsRepository = new LeadsRepository(Lead, "Lead");
const leadsController = new LeadsController(leadsRepository, {
  singular: "Lead",
  plural: "Leads",
});

leadsRouter.get("/", leadsController.get);
leadsRouter.get("/:id", leadsController.getById);
leadsRouter.post("/", leadsController.add);
leadsRouter.post(
  "/import",
  multerUpload.single("file"),
  leadsController.importFromXlsx,
);
leadsRouter.put("/", leadsController.updateById);
leadsRouter.delete("/:id", leadsController.deleteById);

export default leadsRouter;
