export type KeyValueType = {
  id: string;
  label: string;
};

export type DataType = KeyValueType & {
  relation?: KeyValueType;
};
