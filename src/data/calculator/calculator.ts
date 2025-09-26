import {
  BRACKETS,
  DEFAULT_SALARY_VALUE,
  DEFAULT_SS_RATE,
  MIN_SALARY_VALUE,
  MIN_SS_SALARY_VALUE,
  ROUNDING_METHOD,
  ROUNDING_STATUS,
  ROUND_TO_NEAREST,
} from "./constants";
import type { Calculator } from "./models";

export function calculator(): Calculator {
  return {
    result: 0,
    salary: {
      value: DEFAULT_SALARY_VALUE,
      min: MIN_SALARY_VALUE,
      brackets: BRACKETS,
      check(): boolean {
        return this.value >= this.min;
      },
    },
    ss: {
      status: false,
      salary: 0,
      min: MIN_SS_SALARY_VALUE,
      rate: DEFAULT_SS_RATE,
      calculate(): number {
        if (this.status) {
          return this.salary * this.rate;
        }
        return 0;
      },
      check(): boolean {
        return this.salary >= this.min;
      },
    },
    rounder: {
      status: ROUNDING_STATUS,
      method: ROUNDING_METHOD,
      toNearest: ROUND_TO_NEAREST,
      roundTo(amount: number): number {
        if (!this.status) {
          return amount;
        }
        return Math[this.method](amount / this.toNearest) * this.toNearest;
      },
    },
    init(): void {
      this.ss.salary = this.ss.min;
    },
    reset(): void {
      this.ss.status = false;
      this.ss.salary = this.ss.min;
      this.salary.value = this.salary.min;
      this.result = 0;
    },
    allValid(): boolean {
      return this.salary.check() && this.ss.check();
    },
    calculateTaxableSalary(): number {
      if (this.ss.status) {
        return this.salary.value - this.ss.rate * this.ss.salary;
      }
      return this.salary.value;
    },
    calculate(): void {
      let tax = 0;
      let salary = this.calculateTaxableSalary();
      for (const bracket of this.salary.brackets) {
        if (bracket.min <= salary && salary <= bracket.max) {
          let bracketTax = bracket.rate * (salary - bracket.min);
          tax += bracketTax;
          this.result = this.rounder.roundTo(tax);
          return;
        } else {
          tax += (bracket.max - bracket.min) * bracket.rate;
        }
      }
    },
  };
}
