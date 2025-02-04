import { KeyValueType } from "@/types/base";
import { normalizeString } from "./string";

export function sortInsensitivelyKeyValueStringArray(
  data: KeyValueType<string>[],
  language: string = "fr"
) {
  return data.sort((a, b) =>
    normalizeString(a.key).localeCompare(normalizeString(b.key), language)
  );
}
