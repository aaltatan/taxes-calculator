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

export default function calculator(): Calculator {
  return {
    tax: 0,
    salary: {
      value: DEFAULT_SALARY_VALUE,
      min: MIN_SALARY_VALUE,
      brackets: BRACKETS,
      get hasError(): boolean {
        return this.value < this.min;
      },
    },
    ss: {
      joined: false,
      salary: 0,
      min: MIN_SS_SALARY_VALUE,
      rate: DEFAULT_SS_RATE,
      get deduction(): number {
        if (this.joined) {
          return this.salary * this.rate;
        }
        return 0;
      },
      get hasError(): boolean {
        return this.salary < this.min;
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
      this.ss.joined = false;
      this.ss.salary = this.ss.min;
      this.salary.value = this.salary.min;
      this.tax = 0;
    },
    get hasErrors(): boolean {
      return this.salary.hasError || this.ss.hasError;
    },
    get taxableSalary(): number {
      return this.salary.value - this.ss.deduction;
    },
    calculate(): void {
      let tax = 0;
      for (const bracket of this.salary.brackets) {
        if (bracket.min <= this.taxableSalary && this.taxableSalary <= bracket.max) {
          let bracketTax = bracket.rate * (this.taxableSalary - bracket.min);
          tax += bracketTax;
          this.tax = this.rounder.roundTo(tax);
          return;
        } else {
          tax += (bracket.max - bracket.min) * bracket.rate;
        }
      }
    },
  };
}
