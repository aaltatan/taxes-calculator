import {
  BRACKETS,
  DEFAULT_SALARY_VALUE,
  DEFAULT_SS_RATE,
  MIN_SALARY_VALUE,
  MIN_SS_SALARY_VALUE,
  ROUND_METHODS,
  SS_ROUNDING_METHOD,
  SS_ROUNDING_STATUS,
  SS_ROUND_TO_NEAREST,
  TAXES_ROUNDING_METHOD,
  TAXES_ROUNDING_STATUS,
  TAXES_ROUND_TO_NEAREST,
} from "./constants";
import type { Calculator } from "./models";
import { calculateTax, roundTo } from "./services";

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
      salary: MIN_SS_SALARY_VALUE,
      min: MIN_SS_SALARY_VALUE,
      rate: DEFAULT_SS_RATE,
      rounder: {
        status: SS_ROUNDING_STATUS,
        method: SS_ROUNDING_METHOD,
        methods: ROUND_METHODS,
        toNearest: SS_ROUND_TO_NEAREST,
        roundTo(amount: number): number {
          if (!this.status) return amount;
          return roundTo(amount, this.method, this.toNearest);
        },
      },
      get deduction(): number {
        if (!this.joined) {
          return 0;
        }

        let deduction = this.salary * this.rate;

        if (this.rounder && this.rounder.status) {
          deduction = this.rounder.roundTo(deduction);
        }

        return deduction;
      },
      get hasError(): boolean {
        return this.salary < this.min;
      },
    },
    rounder: {
      status: TAXES_ROUNDING_STATUS,
      method: TAXES_ROUNDING_METHOD,
      methods: ROUND_METHODS,
      toNearest: TAXES_ROUND_TO_NEAREST,
      roundTo(amount: number): number {
        if (!this.status) return amount;
        return roundTo(amount, this.method, this.toNearest);
      },
    },
    init(): void {
      this.ss.salary = this.ss.min;
      this.calculate();
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
      this.tax = calculateTax(this.taxableSalary, this.salary.brackets, this.rounder);
    },
  };
}
