import { DeuxParDeuxMap } from "../../models/DeuxParDeuxMap.model";
import { Solver } from "../Solver";

export class SolverAvecObservable {

  map: DeuxParDeuxMap;

  constructor(map: DeuxParDeuxMap) {
    this.map = map;
  }


  solveMap() {

    let nbrLoopMax = 1;
    let nbrLoop = 0;
    let nbrCasesVides;
    do {
      nbrLoop++;
      nbrCasesVides = Solver.verifierSiTableauRemplis(this.map.tableau);
      if (nbrCasesVides > 0) {

        for (let row of this.map.tableau) {
          for (let cell of row) {
            // TODO
          }
        }
      }
    } while ((nbrCasesVides != 0) && nbrLoop < nbrLoopMax)
    console.log("Fin")
  }





}
