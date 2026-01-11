import { ProfileType } from "store/reducers/profile/types";

export interface IProfileInfo {
  profile: ProfileType;
  status: string;
  updateStatus: (status: string) => void;
  isOwner: boolean;
  savePhoto: (file: File) => void;
  saveProfile: (profiel: ProfileType) => Promise<any>;
}
