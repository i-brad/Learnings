import React, { useState } from "react";
import { AiOutlineCheckSquare } from "react-icons/ai";
import { MdOutlineCheckBoxOutlineBlank } from "react-icons/md";
import { requestNotificationPermission } from "../../services/notification";

function RequestNotificationModal() {
  const [checked, handleChecked] = useState(false);
  const [granted, setGranted] = useState(false);

  const subscribeHandler = async () => {
    handleChecked(true);
    const permission = await requestNotificationPermission();
    if (permission) {
      handleChecked(false);
      if (permission === "granted") {
        setGranted(true);
      }
    }
  };
  return (
    <>
      {checked && (
        <span className="fixed block w-screen h-screen z-[100] bg-black/50"></span>
      )}
      {!granted && (
        <div className="fixed z-50 bottom-6 right-4 p-4 bg-white rounded-lg shadow-lg h-32 w-64">
          <h2 className="text-sm lg:text-base font-semibold">
            Get Notification
          </h2>
          <p className="text-xs mt-2">
            On the status of you order... When it is been processed or has been
            delivered
          </p>

          <button className="flex items-center space-x-2 mt-2 border-0">
            {checked ? (
              <AiOutlineCheckSquare
                className="w-5 h-5"
                onClick={() => handleChecked(false)}
              />
            ) : (
              <MdOutlineCheckBoxOutlineBlank
                className="w-5 h-5"
                onClick={subscribeHandler}
              />
            )}
            <span className="text-xs font-medium">Subscribe</span>
          </button>
        </div>
      )}
    </>
  );
}

export default RequestNotificationModal;
