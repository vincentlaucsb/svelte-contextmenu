import { writable } from "svelte/store";
import Settings from "./Settings";

export const currentMenu = writable(null);
export const defaultSettings = writable(Settings.DefaultCss());