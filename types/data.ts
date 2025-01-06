export type KeyValueType<T> = {
  key: string;
  value: T;
};

export type ValueWithRelationType<T, U> = {
  value: T;
  relation: KeyValueType<U>;
};
