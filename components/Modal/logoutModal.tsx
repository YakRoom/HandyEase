"use client";
import React from "react";
import useBodyScrollLock from "@/hooks/useBodyScrollLock";


interface ModalProps {
  isModal: boolean;
  setShowModal: (value: boolean) => void;
  setIsOpen?: (value: boolean) => void;
  title?: string;
  message?: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel?: () => void;
}

const Modal: React.FC<ModalProps> = ({
  isModal,
  setShowModal,
  setIsOpen,
  title = "Confirm Action",
  message = "Are you sure you want to proceed?",
  confirmText = "Confirm",
  cancelText = "Cancel",
  onConfirm,
  onCancel,
}) => {
  const handleConfirm = () => {
    onConfirm(); // Dynamic action on confirm
    setShowModal(false);
    setIsOpen?.(false);
  };
  useBodyScrollLock(isModal);
  const handleCancel = () => {
    onCancel ? onCancel() : setShowModal(false);
  };

  return (
    <>
      {isModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 h-full">
          <div className="bg-white p-6 rounded-lg shadow-lg w-80">
            <h2 className="text-lg font-semibold mb-4">{title}</h2>
            <p className="mb-4">{message}</p>
            <div className="flex justify-end gap-4">
              <button
                onClick={handleCancel}
                className="bg-gray-300 hover:bg-gray-400 text-black px-4 py-2 rounded-lg"
              >
                {cancelText}
              </button>
              <button
                onClick={handleConfirm}
                className="btn-primary hover:btn-primary text-white px-4 py-2 rounded-lg"
              >
                {confirmText}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
