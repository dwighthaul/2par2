import { Case } from '../../models/Case.model';
import { DeuxParDeuxMap } from '../../models/DeuxParDeuxMap.model';
import { Status } from '../../models/Status.model';
import { SolverColumn } from './SolverColumn';
import { SolverLine } from './SolverLigne';

export class Solver {
  map: DeuxParDeuxMap;
  solverLine: SolverLine;
  solverColumn: SolverColumn;
  constructor(map: DeuxParDeuxMap) {
    this.map = map;
    this.solverLine = new SolverLine(map);
    this.solverColumn = new SolverColumn(map);

  }

  async solveMap() {

    let nbrLoopMax = 20;
    let nbrLoop = 0;
    let nbrCasesVides;
    do {
      nbrLoop++;
      nbrCasesVides = this.verifierSiTableauRemplis()
      if (nbrCasesVides > 0) {

        for (let row of this.map.tableau) {
          for (let cell of row) {
            this.verifierProximiteCell(cell);
          }
        }
        await this.sleep(0); // then the created Promise can be awaited

      }
    } while ((nbrCasesVides != 0) && nbrLoop < nbrLoopMax)
    console.log("Fin")
  }


  verifierSiTableauRemplis() {
    return this.map.tableau.reduce((total, listeCase) => {
      let nbrCaseVides = listeCase.filter((cell) => {
        return cell.getStatus().estDefault
      }).length;
      return total + nbrCaseVides;
    }, 0)
  }


  // Verification des cellules de droite et bas
  verifierProximiteCell(cell: Case) {
    if (cell && cell.getStatus().estDefault) {
      this.solverLine.solverLigne(cell);
    }
    if (cell && cell.getStatus().estDefault) {
      this.solverColumn.solverColumn(cell);
    }
    if (cell && cell.getStatus().estDefault) {
      this.calculerNombreCouleurSurLigne(cell);
    }
    if (cell && cell.getStatus().estDefault) {
      this.calculerNombreCouleurSurColonne(cell);
    }
    if (cell && cell.getStatus().estDefault) {
      this.calculerLigneIdentique(cell);
    }

  }


  calculerLigneIdentique(cell: Case) {

    for (let i = 0; i < this.map.tableau.length; i++) {
      if (i != cell.x) {
        const cellDiffDefault = this.map.tableau[i].filter((cellLoop) => {
          return (!cellLoop.getStatus().estDefault)
        });
        // Si la liste est complete
        if (cellDiffDefault.length === this.map.tableau.length) {
          let cellsDiff = this.arrayDiff(this.map.tableau[cell.x], this.map.tableau[i]);
          if (cellsDiff.length === 2) {
            this.completeCell(cell, cellsDiff);
          }
        }
      }
    }
  }

  arrayDiff(origine: Array<Case>, target: Array<Case>) {
    let diff = [];

    for (let i = 0; i < this.map.tableau.length; i++) {
      if (origine[i].getStatus() != target[i].getStatus()) {
        diff.push(target[i]);
      }
    }
    return diff;
  }

  completeCell(cell: Case, cellsDiff: Case[]) {
    let cellTarget = cellsDiff.find((cellDepuisListe) => {
      console.log(cellDepuisListe.toString());
      return (cellDepuisListe.y === cell.y)
    })

    if (cellTarget) {
      cell.choisirAutreStatus(cellTarget.getStatus());
    }
  }

  calculerNombreCouleurSurLigne(cell: Case) {

    for (let statusBuffer of Status.listeStatus) {

      // Si différent de défault
      if (!statusBuffer.estDefault) {

        let nombreCelluleBLank = this.map.recupererNombreElementLigneAvecStatus(cell.x, Status.STATE_BLANK);

        let nombreCelluleSurStatus = this.map.recupererNombreElementLigneAvecStatus(cell.x, statusBuffer);

        // Si aucune
        if (nombreCelluleBLank != 0) {
          if (nombreCelluleSurStatus === this.map.tableau.length / 2) {
            cell.choisirAutreStatus(statusBuffer);
          }
        } else {
          console.log('La ligne est vide -> Pas de traitement particulier');
        }
      }
    }
  }

  calculerNombreCouleurSurColonne(cell: Case) {

    for (let statusBuffer of Status.listeStatus) {

      // Si différent de défault
      if (!statusBuffer.estDefault) {

        let nombreCelluleBLank = this.map.recupererNombreElementColonneAvecStatus(cell.y, Status.STATE_BLANK);

        let nombreCelluleSurStatus = this.map.recupererNombreElementColonneAvecStatus(cell.y, statusBuffer);

        // Si aucune
        if (nombreCelluleBLank != 0) {
          if (nombreCelluleSurStatus === this.map.tableau.length / 2) {
            cell.choisirAutreStatus(statusBuffer);
          }
        }
      }
    }
  }

  sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

}

