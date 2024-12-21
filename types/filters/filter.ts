import { DataType } from "../data";

export interface FiltersProps {
  family: DataType;
  genus: DataType;
  category: DataType;
  lifeCycle: DataType;
  sunExposure: DataType;
  waterNeed: DataType;
  melliferous: DataType;
  // coldHardiness: FilterFieldType;
  // origin: FilterFieldType;
}

export type FiltersType = Partial<FiltersProps>;

export type FilterRequestType = Record<keyof FiltersProps, string>;
