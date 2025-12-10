export interface IHeaderProps {
  isAuth: boolean;
  login: string | null;
  logout: () => void;
}

export interface IHeaderContainerProps {
  isAuth: boolean;
  login: string | null;
  logout: () => void;
}
