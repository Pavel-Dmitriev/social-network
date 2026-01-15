import { FilterType } from "store/reducers/users/types";

export interface ISearchUsers {
  onFilterChanged: (filter: FilterType) => void;
}
