import { Document } from "mongoose";
import Repository from "../../../repository/Repository.js";
import { LeadEntity, LeadEntityData } from "../LeadEntity.js";
import Lead from "../model/Lead.js";
import { LeadsRepositoryStructure } from "./types";

function excelDateToJSDate(serial: number) {
  const utc_days = Math.floor(serial - 25569);
  const utc_value = utc_days * 86400;
  const date_info = new Date(utc_value * 1000);

  const fractional_day = serial - Math.floor(serial) + 0.0000001;

  let total_seconds = Math.floor(86400 * fractional_day);

  const seconds = total_seconds % 60;

  total_seconds -= seconds;

  const hours = Math.floor(total_seconds / (60 * 60));
  const minutes = Math.floor(total_seconds / 60) % 60;

  return new Date(
    date_info.getFullYear(),
    date_info.getMonth(),
    date_info.getDate(),
    hours,
    minutes,
    seconds,
  );
}

class LeadsRepository
  extends Repository<LeadEntity, LeadEntityData>
  implements LeadsRepositoryStructure
{
  importContacts = (contacts: string[][]) => {
    const newLeads: Document[] = [];

    contacts.forEach((contact) => {
      const entryDate = excelDateToJSDate(Number(contact[4]));

      const localEntryDate = new Date(
        entryDate.getTime() - entryDate.getTimezoneOffset() * 60000,
      );

      const newLead = new Lead({
        name: contact[0],
        channel: contact[1],
        origin: contact[2],
        referralOf: contact[3],
        entryDate: localEntryDate,
        email: contact[5],
        phoneNumber: contact[6],
        askedFor: contact[7],
        formComments: contact[8],
      });

      newLeads.push(newLead);
    });

    this.model.insertMany(newLeads);
  };
}

export default LeadsRepository;
