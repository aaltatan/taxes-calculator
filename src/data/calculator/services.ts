import type { RoundMethod } from "./constants";
import type { Bracket, Rounder } from "./models";

export function roundTo(amount: number, method: RoundMethod, toNearest: number): number {
  if (!toNearest) return amount;
  return Math[method](amount / toNearest) * toNearest;
}

export function calculateTax(taxableSalary: number, brackets: Bracket[], rounder: Rounder): number {
  let tax = 0;

  for (const bracket of brackets) {
    if (bracket.min <= taxableSalary && taxableSalary <= bracket.max) {
      let bracketTax = bracket.rate * (taxableSalary - bracket.min);
      tax += bracketTax;
      tax = rounder.roundTo(tax);
      return tax;
    } else {
      tax += (bracket.max - bracket.min) * bracket.rate;
    }
  }

  return tax;
}
