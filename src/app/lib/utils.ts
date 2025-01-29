import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// Combine classes with tailwind-merge
export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}