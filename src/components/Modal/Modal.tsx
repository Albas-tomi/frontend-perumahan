import React from "react";
import { IoIosClose } from "react-icons/io";

type FormUsersProps = {
  children: React.ReactNode | any;
  width?: string;
  height?: string;
};

const Modal = (props: FormUsersProps) => {
  return (
    <div className="fixed inset-0 z-999999 h-screen w-screen overflow-y-auto bg-black bg-opacity-50">
      <main
        className={`no-scrollbar absolute left-1/2 top-1/2  ${
          props.width ? props.width : "h-[90%]"
        } ${props.height ? props.height : "w-[90%]"} -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-lg bg-white p-4`}
      >
        {props.children}
      </main>
    </div>
  );
};

export default Modal;
