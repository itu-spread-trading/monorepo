import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function clsnm(...inputs: Array<ClassValue>): string {
    return twMerge(clsx(inputs));
}
