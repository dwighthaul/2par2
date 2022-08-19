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

    var nbrLoopMax = 20;
    var nbrLoop = 0;
    var nbrCasesVides;
    do {
      nbrLoop++;
      nbrCasesVides = this.verifierSiTableauRemplis()
      if (nbrCasesVides > 0) {

        for (var row of this.map.tableau) {
          for (var cell of row) {
            if (cell.getStatus() === Status.STATE_BLANK) {
              this.verifierProximiteCell(cell);
            }
          }
        }
        await this.sleep(0); // then the created Promise can be awaited

      }
    } while ((nbrCasesVides != 0) && nbrLoop < nbrLoopMax)
    console.log("Fin")
  }


  verifierSiTableauRemplis() {
    return this.map.tableau.reduce((total, listeCase) => {
      var nbrCaseVides = listeCase.filter((cell) => {
        return cell.getStatus().estDefault
      }).length;
      return total + nbrCaseVides;
    }, 0)
  }


  // Verification des cellules de droite et bas
  verifierProximiteCell(cell: Case) {
    this.solverLine.solverLigne(cell);
    this.solverColumn.solverColumn(cell);

    if (cell && cell.getStatus().estDefault) {
      this.calculerNombreCouleurSurLigne(cell);
    }
    if (cell && cell.getStatus().estDefault) {
      this.calculerNombreCouleurSurColonne(cell);
    }
    if (cell && cell.getStatus().estDefault) {
      this.calculerLigneIdentique(cell);
    }
    /**/
  }


  calculerLigneIdentique(cell: Case) {

    for (let i = 0; i < this.map.tableau.length; i++) {
      if (i != cell.x) {
        const cellDiffDefault = this.map.tableau[i].filter((cellLoop) => {
          return (!cellLoop.getStatus().estDefault)
        });
        // Si la liste est complete
        if (cellDiffDefault.length === this.map.tableau.length) {
          var cellsDiff = this.arrayDiff(this.map.tableau[cell.x], this.map.tableau[i]);
          if (cellsDiff.length === 2) {
            this.completeCell(cell, cellsDiff);
          }
        }
      }
    }
  }

  arrayDiff(origine: Array<Case>, target: Array<Case>) {
    var diff = [];

    for (var i = 0; i < this.map.tableau.length; i++) {
      if (origine[i].getStatus() != target[i].getStatus()) {
        diff.push(target[i]);
      }
    }
    return diff;
  }

  completeCell(cell: Case, cellsDiff: Case[]) {
    var cellTarget = cellsDiff.find((cellDepuisListe) => {
      console.log(cellDepuisListe.toString());
      return (cellDepuisListe.y === cell.y)
    })

    if (cellTarget) {
      cell.choisirAutreStatus(cellTarget.getStatus());
    }
  }

  calculerNombreCouleurSurLigne(cell: Case) {
    //console.log('La cellule %s a analyser', cell.toString());

    for (var statusBuffer of Status.listeStatus) {
      //      console.log(statusBuffer)

      // Si différent de défault
      if (!statusBuffer.estDefault) {

        var nombreCelluleBLank = this.map.recupererNombreElementLigneAvecStatus(cell.x, Status.STATE_BLANK);

        var nombreCelluleSurStatus = this.map.recupererNombreElementLigneAvecStatus(cell.x, statusBuffer);

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
    //    console.log('La cellule %s a analyser', cell.toString());

    for (var statusBuffer of Status.listeStatus) {
      //      console.log(statusBuffer)

      // Si différent de défault
      if (!statusBuffer.estDefault) {

        var nombreCelluleBLank = this.map.recupererNombreElementColonneAvecStatus(cell.y, Status.STATE_BLANK);

        var nombreCelluleSurStatus = this.map.recupererNombreElementColonneAvecStatus(cell.y, statusBuffer);

        // Si aucune
        if (nombreCelluleBLank != 0) {
          if (nombreCelluleSurStatus === this.map.tableau.length / 2) {
            cell.choisirAutreStatus(statusBuffer);
            //this.map.tableau[cell.x][cell.y].choisirAutreStatus(statusBuffer);

          }
        }
      }
    }
  }

  sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

}

