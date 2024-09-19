import xlsx from "node-xlsx";
import Controller from "../../../controller/Controller.js";
import Upload from "../../../upload/Upload.js";
import { LeadEntity, LeadEntityData } from "../LeadEntity";
import { MulterRequest, WithXlsxImport } from "./types";
import ServerError from "../../../server/errors/ServerError/ServerError.js";
import { NextFunction, Response } from "express";
import LeadsRepository from "../repository/LeadsRepository.js";
import { EntityNames } from "../../../controller/types.js";

const upload = Upload.getInstance();

class LeadsController
  extends Controller<LeadEntity, LeadEntityData>
  implements WithXlsxImport
{
  constructor(
    protected repository: LeadsRepository,
    entityNames: EntityNames,
  ) {
    super(repository, entityNames);
  }

  importFromXlsx = (req: MulterRequest, res: Response, next: NextFunction) => {
    upload.deleteOldFiles();

    const workSheetsFromFile = xlsx.parse(req.file.path);

    const contactsWorkSheet = workSheetsFromFile.find(
      (workSheet) => workSheet.name === "Contactos",
    );

    if (!contactsWorkSheet) {
      const error = new ServerError("No worksheet", 400);

      next(error);
      return;
    }

    const selectedIndexes = JSON.parse(req.body.selectedIndexes);

    contactsWorkSheet.data.splice(0, 1);
    const contacts = contactsWorkSheet.data.filter((_contact, index) =>
      selectedIndexes.includes(index),
    );

    this.repository.importContacts(contacts);

    res.status(201).json({ imported: contacts.length });
  };
}

export default LeadsController;
