export default Menu;
import { default as Menu } from "./Menu.svelte";
import { default as Item } from "./MenuItem.svelte";
import { default as Divider } from "./Divider.svelte";
import { default as Settings } from "./Settings";
import { defaultSettings } from "./stores";
export function useBootstrap(): void;
export function useDefaultStyles(): void;
export { Item, Divider, Settings, defaultSettings };
