export function formatEnum<
  T extends Record<string, string | number>,
  K extends keyof T
>(
  enumObj: T,
  value: number | string,
  customNames?: Partial<Record<K, string>>
): string {
  const enumKey = enumObj[value as keyof typeof enumObj];

  if (!enumKey) return "-";

  const key = typeof enumKey === "string" ? enumKey : String(enumKey);

  return customNames?.[key as K] ?? key;
}
