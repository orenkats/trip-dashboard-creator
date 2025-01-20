import { toast as sonnerToast } from "sonner";

export interface ToastProps {
  title: string;
  description?: string;
  variant?: "default" | "destructive";
}

export const toast = ({ title, description, variant }: ToastProps) => {
  sonnerToast(title, {
    description,
    style: variant === "destructive" ? { backgroundColor: "red", color: "white" } : undefined,
  });
};

export const useToast = () => {
  return {
    toast,
    toasts: [] as ToastProps[],
  };
};