/** Generate the context menu CSS class name */
export function getMenuClass(position, settings) {
    let classes = [...settings.Menu.Class];
    if (position) {
        return classes.concat(settings.Menu.VisibleClass).join(' ');
    }
    return classes.join(' ');
}
