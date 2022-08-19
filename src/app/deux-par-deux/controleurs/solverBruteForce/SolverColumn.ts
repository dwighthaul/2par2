import { Case } from "../../models/Case.model";
import { DeuxParDeuxMap } from "../../models/DeuxParDeuxMap.model";
import { Status } from "../../models/Status.model";

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

      var celluleBas = this.map.tableau[cell.x + 1][cell.y];
      var cellule2ABas = this.map.tableau[cell.x + 2][cell.y];

      if (celluleBas && cellule2ABas && celluleBas.getStatus() && !celluleBas.getStatus().estDefault && celluleBas.getStatus() === cellule2ABas.getStatus()) {
        cell.choisirAutreStatus(celluleBas.getStatus());

        var cellule3ABas = this.map.tableau[cell.x + 3][cell.y];
        if (cellule3ABas && cellule3ABas) {
          cellule3ABas.choisirAutreStatus(celluleBas.getStatus());
        }
      }
    } catch (e) {
      // Out of bound
    }

  }

  private verifierCelluleMilieu(cell: Case) {

    try {
      var celluleHaut = this.map.tableau[cell.x - 1][cell.y];
      var celluleBas = this.map.tableau[cell.x + 1][cell.y];
      if (celluleHaut && celluleBas && celluleHaut.getStatus() && !celluleHaut.getStatus().estDefault && celluleHaut.getStatus() === celluleBas.getStatus()) {

        cell.choisirAutreStatus(celluleHaut.getStatus());
      }
    } catch (e) {
      // Out of bound
    }
  }


  private verifierCelluleHaut(cell: Case) {
    try {

      var celluleHaut = this.map.tableau[cell.x - 1][cell.y];
      var cellule2AHaut = this.map.tableau[cell.x - 2][cell.y];
      if (celluleHaut && cellule2AHaut && celluleHaut.getStatus() && !celluleHaut.getStatus().estDefault && celluleHaut.getStatus() === cellule2AHaut.getStatus()) {

        cell.choisirAutreStatus(celluleHaut.getStatus());
        var cellule3AHaut = this.map.tableau[cell.x - 3][cell.y];
        if (cellule3AHaut) {
          cellule3AHaut.choisirAutreStatus(celluleHaut.getStatus());
        }
      }
    } catch (e) {
      // Out of bound
    }

  }
}
