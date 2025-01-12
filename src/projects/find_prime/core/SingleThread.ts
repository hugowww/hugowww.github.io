import { SimpleFindPrimeAlgorithm } from "./finder";
import type { IWorker } from "./IWorker";

export class SingleThread implements IWorker {
  private finder: SimpleFindPrimeAlgorithm;
  private startNumber: number;
  private endNumber: number;
  private updateCallback: (p: number) => void;

  constructor(
    startNumber: number,
    endNumber: number,
    updateCallback: (p: number) => void
  ) {
    this.startNumber = startNumber;
    this.endNumber = endNumber;
    this.updateCallback = updateCallback;

    this.finder = new SimpleFindPrimeAlgorithm();
  }

  public start() {
    this.finder.findPrimes(this.startNumber, this.endNumber, (p) => {
      this.updateCallback(p);
    });
  }
}
