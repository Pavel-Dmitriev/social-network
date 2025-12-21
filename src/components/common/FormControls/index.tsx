import React from "react";
import { WrappedFieldMetaProps } from "redux-form";
import { createField } from "./createField";
import Input from "./Input";
import TextArea from "./TextArea";

type FormControlPropsType = {
  meta: WrappedFieldMetaProps;
};

const FormControl: React.FC<FormControlPropsType> = (props) => {
  const {
    meta: { touched, error },
    children,
  } = props;

  const hasError = touched && error;
  return (
    <div className="">
      {children}
      {hasError && <span>{error}</span>}
      <br />
    </div>
  );
};

export { Input, TextArea };

export { createField };

export default FormControl;
