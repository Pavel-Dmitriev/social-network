import { Field, WrappedFieldProps } from "redux-form";
import { FieldValidatorType } from "utils/validators";

export function createField<FormKeysType extends string>(
  placeholder: string | undefined,
  name: FormKeysType,
  validators: FieldValidatorType[],
  component: React.FC<WrappedFieldProps>,
  props = {},
  text = ""
) {
  return (
    <div>
      <Field
        placeholder={placeholder}
        name={name}
        validate={validators}
        component={component}
        {...props}
      />
      {text}
    </div>
  );
}
