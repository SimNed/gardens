import { LifeCycle, Melliferous, SunExposure, WaterNeed } from "@prisma/client";
import { KeyValueType, ValueWithRelationType } from "./data";

export interface SearchFormProps {
  family: KeyValueType<string>;
  genus: KeyValueType<ValueWithRelationType<string, string>>;
  category: KeyValueType<string>;
  lifeCycle: KeyValueType<LifeCycle>;
  sunExposure: KeyValueType<SunExposure>;
  waterNeed: KeyValueType<WaterNeed>;
  melliferous: KeyValueType<Melliferous>;
  coldHardiness: KeyValueType<number>;
}

export type SearchFormType = Partial<SearchFormProps>;

export type SearchFormOptionProps = {
  [K in keyof Omit<SearchFormProps, "coldHardiness">]: SearchFormProps[K][];
} & {
  coldHardiness: KeyValueType<{ min: number; max: number }>;
};

interface SearchRequestProps {
  familyId: string;
  genusId: string;
  plantCategoryId: string;
  lifeCycle: string;
  sunExposure: string;
  waterNeed: string;
  melliferous: string;
  coldHardiness: string;
}

export type SearchRequestType = Partial<SearchRequestProps>;

export type SearchResultType = {
  id: string;
  commonName: string;
  imageUrl: string;
};
