import { useState, useCallback } from "react";

export const useClipboard = () => {
  const [showToast, setShowToast] = useState(false);
  const [toastVariant, setToastVariant] = useState<"info" | "success" | "warning" | "error">("info");

  const copyToClipboard = useCallback(async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setToastVariant("success");
      setShowToast(true);
    } catch (err) {
      console.error("Failed to copy!", err);
      setToastVariant("error");
      setShowToast(true);
    }
  }, []);

  return { copyToClipboard, showToast, toastVariant, setShowToast };
};