export class LevelInformation {
  readonly value: number;
  readonly color: string;

  public static INFO = new LevelInformation(0, 'bg_blue');
  public static WARN = new LevelInformation(1, 'bg_yellow');
  public static ERROR = new LevelInformation(2, 'bg_red');

  constructor(value: number, color: string) {
    this.value = value;
    this.color = color;
  }

  public static listeStatus = [
    LevelInformation.INFO,
    LevelInformation.WARN,
    LevelInformation.ERROR
  ];
}
