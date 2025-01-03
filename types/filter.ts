import { LifeCycle, Melliferous, SunExposure, WaterNeed } from "@prisma/client";
import { RangeValueType, SelectOptionsType } from "./forms";
import { KeyValueType, KeyValueWithRelationType } from "./data";

export interface SearchFormProps {
  family: KeyValueType<string>;
  genus: KeyValueWithRelationType<string, string>;
  category: KeyValueType<string>;
  lifeCycle: KeyValueType<LifeCycle>;
  sunExposure: KeyValueType<SunExposure>;
  waterNeed: KeyValueType<WaterNeed>;
  melliferous: KeyValueType<Melliferous>;
  coldHardiness: KeyValueType<number>;
}

export type SearchFormType = Partial<SearchFormProps>;

export type SearchFormOptionProps = {
  [key in keyof SearchFormProps]: key extends "coldHardiness"
    ? RangeValueType
    : SelectOptionsType;
};

export type FilterOptionType = Partial<SearchFormOptionProps>;

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
