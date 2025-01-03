import { KeyValueType } from "@/types/data";
import { normalizeString } from "./string";

export function sortInsensitivelyKeyValueArray(
  data: KeyValueType[],
  language: string = "fr"
) {
  return data.sort((a, b) =>
    normalizeString(a.value).localeCompare(normalizeString(b.value), language)
  );
}
