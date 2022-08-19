import { DeuxParDeuxMap } from './DeuxParDeuxMap.model';
import { Status } from './Status.model';

export class Case {
  readonly map: DeuxParDeuxMap;
  private statusCase: Status;
  readonly x: number;
  readonly y: number;
  isLocked = false;

  constructor(map: DeuxParDeuxMap, x: number, y: number) {
    this.map = map;
    this.x = x;
    this.y = y;
    this.statusCase = Status.STATE_BLANK;
  }


  choisirProchaineEtat() {
    if (this.isLocked) {
      return false;
    }

    var caseValue = this.statusCase.value;
    var tailleListe = Status.listeStatus.length;

    var caseValueNext =
      (caseValue + (1 % tailleListe) + tailleListe) % tailleListe;

    var statusSuivant = Status.listeStatus.find((status) => {
      return (status.value == caseValueNext)
    });
    statusSuivant = statusSuivant || Status.STATE_BLANK;

    console.log(statusSuivant?.color);
    this.statusCase = statusSuivant;
    return true;
  }

  getStatus() {
    return this.statusCase;
  }

  setStatus(status: Status) {
    this.statusCase = status;
  }



  choisirAutreStatus(status: Status) {
    this.statusCase = Status.trouverAutreCouleur(status);
  }


  toString() {
    return JSON.stringify({ x: this.x, y: this.y, color: this.statusCase.color })
  }
}
