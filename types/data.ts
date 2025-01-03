export type KeyValueType<T> = {
  key: string;
  value: T;
};

export type KeyValueWithRelationType<T, U> = KeyValueType<T> & {
  relation?: KeyValueType<U>;
};
