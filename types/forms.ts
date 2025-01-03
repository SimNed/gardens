import { KeyValueType, KeyValueWithRelationType } from "./data";

export type SelectOptionsType = KeyValueType[] | KeyValueWithRelationType[];

export type RangeValueType = { min: number; max: number };
