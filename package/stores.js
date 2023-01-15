import { readable, writable } from "svelte/store";
import Settings from "./Settings";
export const currentMenu = writable(null);
export const defaultSettings = writable(Settings.DefaultCss());
export const CLOSE_LISTENERS = readable({
	click: "document.body",
	contextmenu: "document.body",
	scroll: "document",
});