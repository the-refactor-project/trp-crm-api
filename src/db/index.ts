import chalk from "chalk";
import mongoose from "mongoose";

const connectToDb = async (mongoDbUrl: string): Promise<void> => {
  await mongoose.connect(mongoDbUrl);

  console.log(chalk.blue("Connected to database"));
};

export default connectToDb;
