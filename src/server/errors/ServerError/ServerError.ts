import { ServerErrorStructure } from "./types";

class ServerError extends Error implements ServerErrorStructure {
  constructor(
    message: string,
    public statusCode: number,
    public internalMessage?: string,
  ) {
    super(message);

    if (!internalMessage) {
      this.internalMessage = message;
    }
  }
}

export default ServerError;
