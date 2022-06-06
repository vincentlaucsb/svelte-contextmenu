import { SvelteComponentTyped } from 'svelte';
import type Settings from './Settings';

export interface MenuProps {
  settings: Settings
}

export default class Menu extends SvelteComponentTyped<MenuProps> {

}