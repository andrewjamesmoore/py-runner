import { BLOCKED_MODULES } from "./pythonSecurity";

export const validateCode = (code: string): boolean => {
  return !code
    .toLowerCase()
    .split("\n")
    .some(
      (line) =>
        !line.startsWith("#") &&
        [...BLOCKED_MODULES].some((keyword) =>
          line.includes(keyword.toLowerCase())
        )
    );
};
