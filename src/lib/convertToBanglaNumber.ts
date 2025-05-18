export function convertToBanglaNumber(number: number): string {
  const englishDigits = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];
  const banglaDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
  return number
    .toString()
    .split("")
    .map((digit: string) => {
      if (englishDigits.includes(digit)) {
        return banglaDigits[parseInt(digit)];
      }
      return digit;
    })
    .join("");
}
