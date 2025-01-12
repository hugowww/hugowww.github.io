export class SimpleFindPrimeAlgorithm {
  private primes: number[] = [];
  constructor() {}

  public getPrimes(): number[] {
    return this.primes;
  }

  public findPrimes(
    startNumber: number,
    endNumber: number,
    callback: (p: number) => void
  ): void {
    for (let i = startNumber; i < endNumber; i++) {
      if (this.isPrime(i)) {
        this.primes.push(i);
        callback(i);
      }
    }
  }

  private isPrime(num: number): boolean {
    if (num <= 1) return false;
    if (num <= 3) return true;

    if (num % 2 === 0 || num % 3 === 0) return false;

    for (let i = 5; i * i <= num; i += 6) {
      if (num % i === 0 || num % (i + 2) === 0) return false;
    }

    return true;
  }
}
