import { LevelInformation } from "./LevelInformation.model";

export class InformationPlateau {
  level: LevelInformation;
  message: String;

  constructor(message: String, level: LevelInformation) {
    this.message = message;
    this.level = level;
  }
}
