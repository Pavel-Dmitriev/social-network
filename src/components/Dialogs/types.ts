export type NewMessageFormType = {
  newMessageBody: string;
};

export type NewMessageFormValuesKeysType = Extract<
  keyof NewMessageFormType,
  string
>;
