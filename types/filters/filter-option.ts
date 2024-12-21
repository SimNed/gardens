import { DataType } from "../data";
import { FiltersProps } from "./filter";

export type FilterOptionsType = DataType[];

export type FilterOptionsProps = Record<keyof FiltersProps, FilterOptionsType>;
