/**
 * Generate a random number between min and max.
 * - If both min and max are integers, returns an integer in [min, max] (inclusive).
 * - Otherwise returns a floating-point number in [min, max).
 * @param {number} min - The minimum value
 * @param {number} max - The maximum value
 * @returns {number} Random number between min and max
 */
export function getRandomNumber(min, max) {
  if (!Number.isFinite(min) || !Number.isFinite(max)) {
    throw new Error("min and max must be finite numbers");
  }
  if (max < min) {
    throw new Error("max must be greater than or equal to min");
  }

  const areBothIntegers = Number.isInteger(min) && Number.isInteger(max);
  if (areBothIntegers) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  return Math.random() * (max - min) + min;
}
