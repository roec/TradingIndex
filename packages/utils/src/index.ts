export const pct = (a: number, b: number) => (b === 0 ? 0 : ((a - b) / b) * 100);
export const clamp = (n: number, min: number, max: number) => Math.min(max, Math.max(min, n));
