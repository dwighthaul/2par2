export class Status {
  readonly value: number;
  readonly color: String;
  readonly estDefault: boolean;


  public static STATE_BLANK = new Status(0, 'bg_white', true);
  public static STATE_ONE = new Status(1, 'bg_blue', false);
  public static STATE_TWO = new Status(2, 'bg_yellow', false);

  constructor(value: number, color: String, estDefault: boolean) {
    this.value = value;
    this.color = color;
    this.estDefault = estDefault;
  }

  public static listeStatus = [
    Status.STATE_BLANK,
    Status.STATE_ONE,
    Status.STATE_TWO,
  ];

  public static trouverAutreCouleur(status: Status) {
    return this.listeStatus.find((x) => {
      return (!x.estDefault && x != status)
    })
  }
}
