import type Settings from "./Settings";
export type MenuPosition = [number, number] | null;

/** Generate the context menu CSS class name */
export function getMenuClass(
    position: MenuPosition,
    settings: Settings
) {
  let classes = [...settings.Menu.Class];

  if (position) {
    return classes.concat(settings.Menu.VisibleClass).join(' ');
  }

  return classes.join(' ');
}