export function convertToBanglaNumber(number: number): string {
  const banglaDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
  return number
    .toString()
    .split("")
    .map((digit: string) => banglaDigits[parseInt(digit)])
    .join("");
}
