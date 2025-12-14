import type { Component, Magic } from "../types";
import type { ROUND_METHODS } from "./constants";

interface SocialSecurity {
  joined: boolean;
  salary: number;
  min: number;
  rate: number;
  deduction: number;
  hasError: boolean;
  rounder?: Rounder;
}

export interface Rounder {
  status: boolean;
  method: keyof typeof ROUND_METHODS;
  methods: typeof ROUND_METHODS;
  toNearest: number;
  roundTo: (amount: number) => number;
}

interface Salary {
  value: number;
  min: number;
  brackets: Bracket[];
  hasError: boolean;
}

export interface Bracket {
  min: number;
  max: number;
  rate: number;
}

export interface Calculator extends Component, Magic {
  ss: SocialSecurity;
  rounder: Rounder;
  salary: Salary;
  tax: number;
  hasErrors: boolean;
  taxableSalary: number;
  reset: () => void;
  calculate: () => void;
}
