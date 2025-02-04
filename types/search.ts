import { KeyValueType } from "./base";

export type RequestFilterType<T> = {
  [K in keyof T]: string;
};

interface PlantSearchProps {
  familyId: KeyValueType<string>;
  genusId: KeyValueType<string>;
  plantCategoryId: KeyValueType<string>;
  lifeCycle: KeyValueType<string>;
  sunExposure: KeyValueType<string>;
  waterNeed: KeyValueType<string>;
  melliferous: KeyValueType<string>;
  coldHardiness: KeyValueType<string>;
}

export type PlantSearchType = Partial<PlantSearchProps>;

export type PlantSearchResultType = {
  id: string;
  commonName: string;
  imageUrl: string;
};
