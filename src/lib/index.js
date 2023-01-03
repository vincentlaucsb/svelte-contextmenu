import { default as Menu } from './Menu.svelte';
import { default as Item } from './MenuItem.svelte';
import { default as Divider } from "./Divider.svelte";
import { default as Settings } from "./Settings";
import { defaultSettings } from './stores';

function useBootstrap() {
    defaultSettings.set(Settings.BootstrapCss());
}

function useDefaultStyles() {
    defaultSettings.set(Settings.DefaultCss());
}

export default Menu;
export { Item, Divider, Settings, useBootstrap, useDefaultStyles };