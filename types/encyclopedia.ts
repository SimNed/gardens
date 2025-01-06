import { KeyValueType } from "./data";

export type EncyclopediaDataType = {
  plants: KeyValueType<string>[];
  families: KeyValueType<string>[];
  genuses: KeyValueType<string>[];
};
