export interface IProfileStatusWithHooks {
  status: string;
  updateStatus: (status: string) => void;
}
