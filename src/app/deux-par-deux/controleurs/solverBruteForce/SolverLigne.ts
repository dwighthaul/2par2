import { Case } from "../../models/Case.model";
import { DeuxParDeuxMap } from "../../models/DeuxParDeuxMap.model";

export class SolverLine {
  map: DeuxParDeuxMap;

  constructor(map: DeuxParDeuxMap) {
    this.map = map;
  }

  solverLigne(cell: Case) {
    if (cell && cell.getStatus().estDefault) {
      this.verifierCelluleDroite(cell);
    }
    if (cell && cell.getStatus().estDefault) {
      this.verifierCelluleGauche(cell);
    }
    if (cell && cell.getStatus().estDefault) {
      this.verifierCelluleMilieu(cell);
    }

  }




  private verifierCelluleDroite(cell: Case) {

    let celluleDroite = this.map.tableau[cell.x][cell.y + 1];
    let cellule2ADroite = this.map.tableau[cell.x][cell.y + 2];
    if (celluleDroite && cellule2ADroite && celluleDroite.getStatus() && !celluleDroite.getStatus().estDefault && celluleDroite.getStatus() === cellule2ADroite.getStatus()) {

      cell.choisirAutreStatus(celluleDroite.getStatus());
      let cellule3ADroite = this.map.tableau[cell.x][cell.y + 3];
      if (cellule3ADroite) {
        cellule3ADroite.choisirAutreStatus(celluleDroite.getStatus());
      }
    }
  }

  private verifierCelluleMilieu(cell: Case) {

    let celluleGauche = this.map.tableau[cell.x][cell.y - 1];
    let celluleDroite = this.map.tableau[cell.x][cell.y + 1];
    if (celluleGauche && celluleDroite && celluleGauche.getStatus() && !celluleGauche.getStatus().estDefault && celluleGauche.getStatus() === celluleDroite.getStatus()) {

      cell.choisirAutreStatus(celluleGauche.getStatus());
    }
  }


  private verifierCelluleGauche(cell: Case) {

    let celluleGauche = this.map.tableau[cell.x][cell.y - 1];
    let cellule2AGauche = this.map.tableau[cell.x][cell.y - 2];
    if (celluleGauche && cellule2AGauche && celluleGauche.getStatus() && !celluleGauche.getStatus().estDefault && celluleGauche.getStatus() === cellule2AGauche.getStatus()) {

      cell.choisirAutreStatus(celluleGauche.getStatus());
      let cellule3AGauche = this.map.tableau[cell.x][cell.y - 3];
      if (cellule3AGauche) {
        cellule3AGauche.choisirAutreStatus(celluleGauche.getStatus());
      }
    }
  }
}
