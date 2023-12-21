import { confirmAlert } from "react-confirm-alert"; // Import
import "react-confirm-alert/src/react-confirm-alert.css";

export const AlertDialog = ({ title, message, intl, options }) => {
  return confirmAlert({
    title: title,
    message: message,
    closeOnClickOutside: false,
    buttons: options,
  });
};

export const ConfirmDelete = ({ message, title, cancelClick, okClick }) => {
  return confirmAlert({
    title: title,
    message: "آیا مطمئن هستید که می خواهید حذف کنید؟",
    buttons: [
      {
        label: "حذف شود",
        className: "cancel-button",
        onClick: okClick,
      },
      {
        label: "انصراف",
      },
    ],
  });
};

export const Confirm = ({ message, title, cancelClick, okClick }) => {
  return confirmAlert({
    title: title,
    message: message,
    buttons: [
      {
        label: "انصراف",
        className: "cancel-button",
        onClick: cancelClick,
      },
      {
        label: "تائید",
        className: "ok-button",
        onClick: okClick,
      },
    ],
  });
};

export const SuccessAlert = ({ message, title }) => {
  return confirmAlert({
    title: title,
    message: message,
    buttons: [
      {
        label: "تائید",
        className: "ok-button",
      },
    ],
  });
};

export const ErrorDialog = (message) => {
  return confirmAlert({
    message: message,
    buttons: [
      {
        label: "تائید",
        className: "cancle-button",
      },
    ],
  });
};

export const SuccessSaveAlert = (message = null) => {
  return confirmAlert({
    message: message ?? "اطلاعات با موفقیت ذخیره شد",
    buttons: [
      {
        label: "تائید",
        className: "ok-button",
      },
    ],
  });
};
