export type FieldValidatorType = (value: string) => string | undefined;

export const required: FieldValidatorType = (value) => {
  return value ? undefined : "Required";
};

export const maxLengthCreator =
  (maxLength: number): FieldValidatorType =>
  (value) => {
    return value.length > maxLength
      ? `Max length is ${maxLength} symbols`
      : undefined;
  };
