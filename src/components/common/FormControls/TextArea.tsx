import { WrappedFieldProps } from "redux-form";
import FormControl from "../FormControls";

const TextArea: React.FC<WrappedFieldProps> = (props) => {
  const { input, meta, ...restProps } = props;
  return (
    <FormControl {...props}>
      <textarea {...input} {...restProps} />
    </FormControl>
  );
};

export default TextArea;
