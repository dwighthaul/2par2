import { Component, OnInit } from '@angular/core';
import { Solver } from './controleurs/solverBruteForce/Solver';
import { Case } from './models/Case.model';
import { DeuxParDeuxMap } from './models/DeuxParDeuxMap.model';
import { LevelInformation } from './models/LevelInformation.model';

@Component({
  selector: 'app-deux-par-deux',
  templateUrl: './deux-par-deux.component.html',
  styleUrls: ['./deux-par-deux.component.scss'],
})
export class DeuxParDeuxComponent implements OnInit {
  map!: DeuxParDeuxMap;
  constructor() { }

  ngOnInit(): void {
    this.map = new DeuxParDeuxMap('Titre', 'Desc', 4);
  }

  reset() {
    this.map = new DeuxParDeuxMap('Titre', 'Desc', 4);
  }

  lancerAlogrithmeCompletion() {
    var s = new Solver(this.map);
    s.solveMap();
  }

  selectCase(caseSelectionne: Case) {
    this.map.deleteInformation();

    var caseModifiee = caseSelectionne.choisirProchaineEtat();
    if (!caseModifiee) {
      this.map.setInformation("la case est vérouillée", LevelInformation.ERROR);
    }

  }


}
