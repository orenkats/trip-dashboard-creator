import { toast } from "sonner";

export interface Toast {
  title?: string;
  description?: string;
}

export const useToast = () => {
  const showToast = ({ title, description }: Toast) => {
    toast(title, {
      description: description,
    });
  };

  return {
    toast: showToast,
  };
};