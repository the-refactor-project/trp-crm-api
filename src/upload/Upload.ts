import path from "node:path";
import fsPromises from "node:fs/promises";
import chalk from "chalk";

class Upload {
  private static instance: Upload;
  private dir = "uploads";

  private constructor() {
    this.init();
  }

  public static getInstance(): Upload {
    if (!Upload.instance) {
      Upload.instance = new Upload();
    }
    return Upload.instance;
  }

  public getDir() {
    return this.dir;
  }

  private async init() {
    try {
      await fsPromises.access(this.dir);
    } catch {
      console.log(chalk.cyan(`Directorio ${this.dir} creado.`));
    }
  }

  deleteOldFiles = async (maxAgeInDays = 1) => {
    const files = await fsPromises.readdir(this.dir);

    files.forEach(async (file) => {
      const filePath = path.join(this.dir, file);
      const stats = await fsPromises.stat(filePath);

      const now = Date.now();
      const modifiedTime = new Date(stats.mtime).getTime();
      const ageInMs = now - modifiedTime;

      const maxAgeInMs = maxAgeInDays * 24 * 60 * 60 * 1000;

      if (ageInMs > maxAgeInMs) {
        try {
          fsPromises.unlink(filePath);

          console.log(chalk.cyan(`Archivo eliminado: ${file}`));
        } catch (error) {
          console.error(
            chalk.red(`Error al eliminar archivo ${file}:`, error.message),
          );
        }
      }
    });
  };
}

export default Upload;
