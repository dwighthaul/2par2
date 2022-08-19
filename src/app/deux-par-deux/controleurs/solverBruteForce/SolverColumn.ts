import { Case } from "../../models/Case.model";
import { DeuxParDeuxMap } from "../../models/DeuxParDeuxMap.model";

export class SolverColumn {
  map: DeuxParDeuxMap;

  constructor(map: DeuxParDeuxMap) {
    this.map = map;
  }

  solverColumn(cell: Case) {
    if (cell && cell.getStatus().estDefault) {
      this.verifierCelluleBas(cell);
    }
    if (cell && cell.getStatus().estDefault) {
      this.verifierCelluleHaut(cell);
    }
    if (cell && cell.getStatus().estDefault) {
      this.verifierCelluleMilieu(cell);
    }

  }




  private verifierCelluleBas(cell: Case) {

    try {

      let celluleBas = this.map.tableau[cell.x + 1][cell.y];
      let cellule2ABas = this.map.tableau[cell.x + 2][cell.y];

      if (celluleBas && cellule2ABas && celluleBas.getStatus() && !celluleBas.getStatus().estDefault && celluleBas.getStatus() === cellule2ABas.getStatus()) {
        cell.choisirAutreStatus(celluleBas.getStatus());

        let cellule3ABas = this.map.tableau[cell.x + 3][cell.y];
        if (cellule3ABas) {
          cellule3ABas.choisirAutreStatus(celluleBas.getStatus());
        }
      }
    } catch (e) {
      // Out of bound
    }

  }

  private verifierCelluleMilieu(cell: Case) {

    try {
      let celluleHaut = this.map.tableau[cell.x - 1][cell.y];
      let celluleBas = this.map.tableau[cell.x + 1][cell.y];
      if (celluleHaut && celluleBas && celluleHaut.getStatus() && !celluleHaut.getStatus().estDefault && celluleHaut.getStatus() === celluleBas.getStatus()) {

        cell.choisirAutreStatus(celluleHaut.getStatus());
      }
    } catch (e) {
      // Out of bound
    }
  }


  private verifierCelluleHaut(cell: Case) {
    try {

      let celluleHaut = this.map.tableau[cell.x - 1][cell.y];
      let cellule2AHaut = this.map.tableau[cell.x - 2][cell.y];
      if (celluleHaut && cellule2AHaut && celluleHaut.getStatus() && !celluleHaut.getStatus().estDefault && celluleHaut.getStatus() === cellule2AHaut.getStatus()) {

        cell.choisirAutreStatus(celluleHaut.getStatus());
        let cellule3AHaut = this.map.tableau[cell.x - 3][cell.y];
        if (cellule3AHaut) {
          cellule3AHaut.choisirAutreStatus(celluleHaut.getStatus());
        }
      }
    } catch (e) {
      // Out of bound
    }

  }
}
