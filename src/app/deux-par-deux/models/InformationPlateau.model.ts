import { LevelInformation } from "./LevelInformation.model";

export class InformationPlateau {
  level: LevelInformation;
  message: string;

  constructor(message: string, level: LevelInformation) {
    this.message = message;
    this.level = level;
  }
}
