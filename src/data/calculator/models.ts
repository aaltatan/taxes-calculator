import type { Component, Magic } from "../types";

export type RoundMethod = "ceil" | "round" | "floor";

interface SocialSecurity {
  /**
   * whether is joined social security or not
   */
  status: boolean;
  /**
   * social security salary
   */
  salary: number;
  /**
   * minimum allowed social security salary
   */
  min: number;
  /**
   * social security rate
   */
  rate: number;
  calculate: () => number;
  check: () => boolean;
}

interface Rounder {
  status: boolean;
  method: RoundMethod;
  toNearest: number;
  roundTo: (amount: number) => number;
}

export interface Bracket {
  min: number;
  max: number;
  rate: number;
}

interface Salary {
  value: number;
  min: number;
  brackets: Bracket[];
  check: () => boolean;
}

export interface Calculator extends Component, Magic {
  /**
   * Social Security Object
   */
  ss: SocialSecurity;
  /**
   * Rounding Object
   */
  rounder: Rounder;
  /**
   * Salary Object
   */
  salary: Salary;

  result: number;
  reset: () => void;
  allValid: () => boolean;
  calculateTaxableSalary: () => number;
  calculate: () => void;
}
