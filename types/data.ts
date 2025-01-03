export type KeyValueType = {
  key: string;
  value: string;
};

export type KeyValueWithRelationType = KeyValueType & {
  relation?: KeyValueType;
};
