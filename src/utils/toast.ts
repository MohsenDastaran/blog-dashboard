import { type ToastOptions, toast as t } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

const defaultOptions = (): ToastOptions => {
	return {
		autoClose: 6000,
		type: "success",
		pauseOnHover: true,
		pauseOnFocusLoss: true,
	};
};
export const toast = {
	default: (content: string, options?: ToastOptions) =>
		t(content, { ...defaultOptions(), ...options, type: "default" }),
	error: (content: string, options?: ToastOptions) =>
		t(content, { ...defaultOptions(), ...options, type: "error" }),
	success: (content: string, options?: ToastOptions) =>
		t(content, { ...defaultOptions(), ...options, type: "success" }),
	warning: (content: string, options?: ToastOptions) =>
		t(content, { ...defaultOptions(), ...options, type: "warning" }),
	loading: (content: string, options?: ToastOptions) =>
		t(content, { ...defaultOptions(), ...options, type: "loading" }),
	info: (content: string, options?: ToastOptions) =>
		t(content, { ...defaultOptions(), ...options, type: "info" }),
};
