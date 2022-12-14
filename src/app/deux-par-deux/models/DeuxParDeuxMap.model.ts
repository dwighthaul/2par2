import { Case } from './Case.model';

import { InformationPlateau } from './InformationPlateau.model';
import { LevelInformation } from './LevelInformation.model';
import { Status } from './Status.model';

export class DeuxParDeuxMap {

  title: string;
  description: string;
  tableau!: Array<Array<Case>>;
  private information!: InformationPlateau;

  constructor(title: string, description: string) {
    this.title = title;
    this.description = description;

  }

  initialiserTableau(modelJson: any) {
    this.createDataTable(modelJson.length);
    this.defineStatusFromJson(modelJson);

  }
  private defineStatusFromJson(modelJson: string | any[]) {

    for (let i = 0; i < modelJson.length; i++) {

      for (let j = 0; j < this.tableau[i].length; j++) {

        let statusCell = Status.listeStatus.find((status) => {
          return (status.value == modelJson[i][j])
        });
        let statusTarget = statusCell || Status.STATE_BLANK
        this.tableau[i][j].setStatus(statusTarget);
        if (this.tableau[i][j].getStatus() != Status.STATE_BLANK) {
          this.tableau[i][j].isLocked = true;
        }

      }
    }
  }

  private createDataTable(taille: number) {
    this.tableau = new Array(taille);
    for (let i = 0; i < taille; i++) {
      this.tableau[i] = new Array(taille);
      for (let j = 0; j < this.tableau[i].length; j++) {
        this.tableau[i][j] = new Case(this, i, j);
      }
    }
  }

  setInformation(message: string, level: LevelInformation) {
    this.information = new InformationPlateau(message, level);
  }


  public getInformation() {
    return this.information;
  }

  deleteInformation() {
    this.information = null;
  }

  recupererNombreElementLigneAvecStatus(idLigne: number, status: Status) {
    let nombreCellule = 0
    for (let i = 0; i < this.tableau.length; i++) {
      if (this.tableau[idLigne][i].getStatus() === status) {
        nombreCellule++;
      }
    }
    return nombreCellule;
  }
  recupererNombreElementColonneAvecStatus(idLigne: number, status: Status) {
    let nombreCellule = 0
    for (const line of this.tableau) {
      if (line[idLigne].getStatus() === status) {
        nombreCellule++;
      }
    }
    return nombreCellule;
  }


}
