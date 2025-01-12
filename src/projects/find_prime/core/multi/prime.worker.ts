import { SimpleFindPrimeAlgorithm } from "../finder";

self.onmessage = (e: MessageEvent) => {
  const { startNumber, endNumber } = e.data;

  const finder = new SimpleFindPrimeAlgorithm();
  finder.findPrimes(startNumber, endNumber, (p) => {
    // Send progress update
    self.postMessage({ type: "progress", data: p });
  });

  // Send final results
  self.postMessage({
    type: "complete",
    primes: finder.getPrimes(),
  });
};
