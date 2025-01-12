import type { IWorker } from "../IWorker";

export class MultiThread implements IWorker {
  private workers: Worker[] = [];
  private completedWorkers = 0;
  private updateCallback: (p: number) => void;
  private completeCallback: () => void;

  constructor(
    private startNumber: number,
    private endNumber: number,
    private count: number,
    updateCallback: (p: number) => void,
    completeCallback: () => void
  ) {
    this.updateCallback = updateCallback;
    this.completeCallback = completeCallback;
  }

  public start() {
    // Calculate work distribution
    var numberCount = this.endNumber - this.startNumber;
    const numbersPerThread = Math.ceil(numberCount / this.count);

    for (let i = 0; i < this.count; i++) {
      // Define job
      const threadStart = this.startNumber + i * numbersPerThread;
      const threadEnd = Math.min(
        threadStart + numbersPerThread,
        this.endNumber
      );

      // Create new worker
      const worker = new Worker(new URL("./prime.worker.ts", import.meta.url), {
        type: "module",
      });

      worker.onmessage = (e: MessageEvent) => this.handleWorkerMessage(e, i);

      // Start the worker
      worker.postMessage({
        startNumber: threadStart,
        endNumber: threadEnd,
      });

      this.workers.push(worker);
    }
  }

  private handleWorkerMessage(e: MessageEvent, workerIndex: number) {
    const { type, data } = e.data;

    if (type === "progress") {
      this.updateCallback(data);
    } else if (type === "complete") {
      this.completedWorkers++;

      // Terminate the worker
      this.workers[workerIndex].terminate();

      // If all workers are done, clear up
      if (this.completedWorkers === this.workers.length) {
        this.workers = [];
        this.completeCallback();
      }
    }
  }
}
