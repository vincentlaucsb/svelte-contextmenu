/** @typedef {typeof __propDef.props}  MenuProps */
/** @typedef {typeof __propDef.events}  MenuEvents */
/** @typedef {typeof __propDef.slots}  MenuSlots */
export default class Menu extends SvelteComponentTyped<{
    settings?: Settings | undefined;
    show?: ((clickEvent: ContextMenuMouseEvent) => void) | undefined;
    createHandler?: (() => (event: ContextMenuMouseEvent) => void) | undefined;
}, {
    [evt: string]: CustomEvent<any>;
}, {
    default: {};
}> {
    get createHandler(): () => (event: ContextMenuMouseEvent) => void;
    get show(): (clickEvent: ContextMenuMouseEvent) => void;
}
export type MenuProps = typeof __propDef.props;
export type MenuEvents = typeof __propDef.events;
export type MenuSlots = typeof __propDef.slots;
import Settings from "./Settings";
import { ContextMenuMouseEvent } from "./ContextMenuMouseEvent";
import { SvelteComponentTyped } from "svelte";
declare const __propDef: {
    props: {
        settings?: Settings | undefined;
        show?: ((clickEvent: ContextMenuMouseEvent) => void) | undefined;
        createHandler?: (() => (event: ContextMenuMouseEvent) => void) | undefined;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {
        default: {};
    };
};
export {};
