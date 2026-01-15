import { Field, Form, Formik, FormikHelpers, FormikValues } from "formik";
import { DEFAULT_VALUES } from "./constants/default_values";
import { FilterType } from "store/reducers/users/types";
import { ISearchUsers } from "./interface";
import { FormType } from "./types";

const SearchUsers: React.FC<ISearchUsers> = ({ onFilterChanged }) => {
  const onSubmit = (
    values: FormType,
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
  ) => {
    let friend: FilterType["friend"];
    debugger;
    if (values.friend === "null") {
      friend = null;
    } else if (values.friend === "true") {
      friend = true;
    } else {
      friend = false;
    }
    const filter = {
      term: values.term,
      friend,
    };
    onFilterChanged(filter);
    setSubmitting(false);
  };

  return (
    <Formik initialValues={DEFAULT_VALUES} onSubmit={onSubmit}>
      {({ isSubmitting }) => (
        <Form>
          <Field type="text" name="term" />
          <Field name="friend" as="select">
            <option value="null">Все</option>
            <option value="true">Отслеживаемые</option>
            <option value="false">Не отслеживаемые</option>
          </Field>
          <button
            type="submit"
            disabled={isSubmitting}
            className="p-2 bg-cyan-300"
          >
            Поиск
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default SearchUsers;
