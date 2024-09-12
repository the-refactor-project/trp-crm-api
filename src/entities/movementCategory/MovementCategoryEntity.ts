import { Types } from "mongoose";

export class MovementCategoryEntityData {
  name: string;
}

export class MovementCategoryEntity extends MovementCategoryEntityData {
  _id: Types.ObjectId;
}
