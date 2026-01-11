import { ProfileType } from "store/reducers/profile/types";

export interface IProfileData {
  profile: ProfileType;
  isOwner: boolean;
  goToEditMode: () => void;
}
