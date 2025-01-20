import { toast as sonnerToast } from "sonner";

export interface ToastProps {
  title: string;
  description?: string;
  variant?: "default" | "destructive";
}

export const toast = ({ title, description, variant }: ToastProps) => {
  sonnerToast(title, {
    description,
    // Map variant to Sonner's style if needed
    style: variant === "destructive" ? { backgroundColor: "red", color: "white" } : undefined,
  });
};

export const useToast = () => {
  return {
    toast,
    // Since we're using Sonner, we don't need to manage toast state ourselves
    toasts: [] as ToastProps[],
  };
};