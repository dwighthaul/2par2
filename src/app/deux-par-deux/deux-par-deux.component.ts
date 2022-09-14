import { Component, OnInit } from '@angular/core';
import { SolverBruteForce } from './controleurs/solverBruteForce/SolverBruteForce';
import { SolverAvecObservable } from './controleurs/solverObserver/SolverAvecObservable';
import { Case } from './models/Case.model';
import { DeuxParDeuxMap } from './models/DeuxParDeuxMap.model';
import { LevelInformation } from './models/LevelInformation.model';
import modelJson from './ressources/model.json';

@Component({
  selector: 'app-deux-par-deux',
  templateUrl: './deux-par-deux.component.html',
  styleUrls: ['./deux-par-deux.component.scss'],
})
export class DeuxParDeuxComponent implements OnInit {
  map!: DeuxParDeuxMap;

  constructor() {
    this.map = new DeuxParDeuxMap('Titre', 'Desc');
  }

  ngOnInit(): void {
    this.reset();
  }

  reset() {
    this.map.initialiserTableau(modelJson);
  }


  lancerSolverObserver() {
    this.lancerAlogrithmeCompletionObserveur();
  }

  lancerSolverBruteForcer() {
    this.lancerAlogrithmeCompletionBruteForce();
  }

  private lancerAlogrithmeCompletionBruteForce() {
    let s = new SolverBruteForce(this.map);
    s.solveMap();
  }

  private lancerAlogrithmeCompletionObserveur() {
    let s = new SolverAvecObservable(this.map);
    s.solveMap();
  }

  selectCase(caseSelectionne: Case) {
    this.map.deleteInformation();

    let caseModifiee = caseSelectionne.choisirProchaineEtat();
    if (!caseModifiee) {
      this.map.setInformation("la case est vérouillée", LevelInformation.ERROR);
    }
  }


}
