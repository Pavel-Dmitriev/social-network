import { IContact } from "../interfaces/IContact";

export const Contact: React.FC<IContact> = ({ contactTitle, contactValue }) => {
  return (
    <div>
      <b>{contactTitle}</b>: {contactValue}
    </div>
  );
};
