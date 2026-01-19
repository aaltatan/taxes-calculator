import type { Bracket } from "./models";

export const DEFAULT_SALARY_VALUE: number = 10_000;
export const MIN_SALARY_VALUE: number = 8_370;
export const BRACKETS: Bracket[] = [
  { min: 0, max: 8_370, rate: 0 },
  { min: 8_370, max: 8_500, rate: 0.11 },
  { min: 8_500, max: 11_000, rate: 0.13 },
  { min: 11_000, max: 500_000, rate: 0.15 },
];

export const MIN_SS_SALARY_VALUE: number = 7_500;
export const DEFAULT_SS_RATE: number = 0.07;

export const ROUND_METHODS = {
  ceil: "أعلى",
  round: "تقريب جبري",
  floor: "أدنى",
};

export type RoundMethod = keyof typeof ROUND_METHODS;

export const TAXES_ROUNDING_STATUS: boolean = true;
export const TAXES_ROUNDING_METHOD: RoundMethod = "ceil";
export const TAXES_ROUND_TO_NEAREST: number = 1;

export const SS_ROUNDING_STATUS: boolean = true;
export const SS_ROUNDING_METHOD: RoundMethod = "round";
export const SS_ROUND_TO_NEAREST: number = 1;
