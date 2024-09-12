import { faker } from "@faker-js/faker";

class Nif {
  private number: string;

  constructor(number?: string) {
    if (!number) {
      this.generateSpanishNif();
      return;
    }

    this.number = number;
  }

  public getNumber(): string {
    return this.number;
  }

  private generateSpanishNif(): void {
    const letters = "TRWAGMYFPDXBNJZSQVHLCKE";
    const randomNumber = faker.number.int({ min: 10000000, max: 99999999 });
    const letter = letters[randomNumber % 23];
    this.number = `${randomNumber}${letter}`;
  }
}

export default Nif;
