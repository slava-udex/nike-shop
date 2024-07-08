import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function fromStringToArray(str: string) {
  return str.length > 0 ? str.split(";") : [];
}

export function fromArrayToString(arr: string[]) {
  return arr.join(";");
}
