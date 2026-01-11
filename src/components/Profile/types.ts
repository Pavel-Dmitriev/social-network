import { GetStringKeys } from "components/common/FormControls/types";
import { IAddPostFormValues } from "./interfaces/IAddPostFormValues";
import { ProfileType } from "store/reducers/profile/types";
import { PostType } from "store/types";

export type AddPostFormValuesKeysType = GetStringKeys<IAddPostFormValues>;
export type ProfileTypeKeys = GetStringKeys<ProfileType>;

export type MapPropsType = {
  posts: PostType[];
};

export type DispatchPropsType = {
  addPost: (newPostText: string) => void;
};
