import chalk from "chalk";
import mongoose from "mongoose";

const connectToDb = async (mongoDbUrl: string): Promise<void> => {
  await mongoose.connect(mongoDbUrl);
  mongoose.set("debug", true);

  console.log(chalk.blue("Connected to database"));
};

export default connectToDb;
