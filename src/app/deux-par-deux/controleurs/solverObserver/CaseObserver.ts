import { Case } from "../../models/Case.model"

export class CaseObserver {
  cell: Case;


  constructor(cell: Case) {
    this.cell = cell;
  }

  next(data: any) {
    console.log(data)
  }
  error(e: any) {
    console.log(e)
  }
  complete() {
    console.log("request complete")
  }



}
