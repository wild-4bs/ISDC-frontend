export const arabicPlural = (
  count: number,
  forms: {
    zero?: string;   // 0
    one: string;     // 1
    two?: string;    // 2
    few: string;     // 3-10
    many: string;    // 11-99
    other: string;   // 100+
  }
): string => {
  const abs = Math.abs(count);

  if (abs === 0) return `${count} ${forms.zero ?? forms.other}`;
  if (abs === 1) return `${count} ${forms.one}`;
  if (abs === 2) return forms.two ? `${forms.two}` : `${count} ${forms.few}`;
  if (abs >= 3 && abs <= 10) return `${count} ${forms.few}`;
  if (abs >= 11 && abs <= 99) return `${count} ${forms.many}`;
  return `${count} ${forms.other}`;
};