import { Case } from './Case.model';

//var urlFile = ;

import modelJson from './4_4_exemple_load.json';
import { Status } from './Status.model';
import { InformationPlateau } from './InformationPlateau.model';
import { LevelInformation } from './LevelInformation.model';

export class DeuxParDeuxMap {

  title: string;
  description: string;
  tableau!: Array<Array<Case>>;
  private information!: InformationPlateau;

  constructor(title: string, description: string, _: any);
  constructor(title: string, description: string, taille: number) {
    this.title = title;
    this.description = description;

    this.createDataTable(modelJson.length);
    this.defineStatusFromJson();
  }

  private defineStatusFromJson() {

    for (var i = 0; i < modelJson.length; i++) {

      for (var j = 0; j < this.tableau[i].length; j++) {

        var status = Status.listeStatus.find((status) => {
          return (status.value == modelJson[i][j])
        });
        var statusTarget = status || Status.STATE_BLANK
        this.tableau[i][j].setStatus(statusTarget);
        if (this.tableau[i][j].getStatus() != Status.STATE_BLANK) {
          this.tableau[i][j].isLocked = true;
        }

      }
    }
  }

  private createDataTable(taille: number) {
    this.tableau = new Array(taille);
    for (var i = 0; i < taille; i++) {
      this.tableau[i] = new Array(taille);
      for (var j = 0; j < this.tableau[i].length; j++) {
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
    var nombreCellule = 0
    for (var i = 0; i < this.tableau.length; i++) {
      if (this.tableau[idLigne][i].getStatus() === status) {
        nombreCellule++;
      }
    }
    return nombreCellule;
  }
  recupererNombreElementColonneAvecStatus(idLigne: number, status: Status) {
    var nombreCellule = 0
    for (var i = 0; i < this.tableau.length; i++) {
      if (this.tableau[i][idLigne].getStatus() === status) {
        nombreCellule++;
      }
    }
    return nombreCellule;
  }



}
