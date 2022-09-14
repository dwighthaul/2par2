import { Case } from "../models/Case.model";

export class Solver {



  static verifierSiTableauRemplis(tableau: Array<Array<Case>>) {
    return tableau.reduce((total, listeCase) => {
      let nbrCaseVides = listeCase.filter((cell) => {
        return cell.getStatus().estDefault
      }).length;
      return total + nbrCaseVides;
    }, 0)


  }
}
