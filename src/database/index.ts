import chalk from "chalk";
import mongoose from "mongoose";

const connectToDb = async (mongoDbUrl: string): Promise<void> => {
  await mongoose.connect(mongoDbUrl);
  mongoose.set("debug", false);
  mongoose.set("toJSON", {
    transform(_doc, ret) {
      const newData = { ...ret };

      delete newData.__v;

      return newData;
    },
  });

  console.log(chalk.blue("Connected to database"));
};

export default connectToDb;
