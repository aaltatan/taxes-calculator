import type { Component, Magic } from "../types";

export type RoundMethod = "ceil" | "round" | "floor";

interface SocialSecurity {
  /**
   * whether is joined social security or not
   */
  joined: boolean;
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
  deduction: number;
  hasError: boolean;
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
  hasError: boolean;
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

  tax: number;
  hasErrors: boolean;
  taxableSalary: number;
  reset: () => void;
  calculate: () => void;
}
