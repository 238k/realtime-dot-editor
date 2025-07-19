import type { FC } from "react";

type Props = {
  children?: React.ReactNode;
};

export const Toolbar: FC<Props> = ({ children }) => {
  return (
    <div className="fixed top-0 left-0 bg-gray-800 text-white flex items-center justify-between px-4">
      {children}
    </div>
  );
};
