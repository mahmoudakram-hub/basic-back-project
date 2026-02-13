/** @format */

export default function getEnv(key: string | undefined): string {
  if (!key) {
    throw new Error(`Missing environment variable: ${key}`);
  }
  const value = process.env[key];
  if (!value) {
    throw new Error(`Missing environment variable: ${key}`);
  }
  return value;
}
