import type { Bracket, RoundMethod } from "./models";

export const DEFAULT_SALARY_VALUE: number = 837_000;
export const MIN_SALARY_VALUE: number = 837_000;
export const BRACKETS: Bracket[] = [
  { min: 0, max: 837_000, rate: 0 },
  { min: 837_001, max: 850_000, rate: 0.11 },
  { min: 850_001, max: 1_100_000, rate: 0.13 },
  { min: 1_100_001, max: 50_000_000, rate: 0.15 },
];

export const MIN_SS_SALARY_VALUE: number = 750_000;
export const DEFAULT_SS_RATE: number = 0.07;

export const ROUNDING_STATUS: boolean = true;
export const ROUNDING_METHOD: RoundMethod = "ceil";
export const ROUND_TO_NEAREST: number = 100;
