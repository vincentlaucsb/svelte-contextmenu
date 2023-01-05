import type Settings from "./Settings";
export declare type MenuPosition = [number, number] | null;
/** Generate context menu style including positioning */
export declare function computeMenuStyle(position: MenuPosition): string;
/** Generate the context menu CSS class name */
export declare function getMenuClass(position: MenuPosition, settings: Settings): string;
