import { useSelector } from "react-redux";
import { getUsersFilter } from "store/user-selectors";
import { FriendFormType } from "./types";

const useDefaultValues = () => {
  const filter = useSelector(getUsersFilter);

  const defaultValues = {
    term: filter.term,
    friend: String(filter.friend) as FriendFormType,
  };

  return defaultValues;
};

export default useDefaultValues;
