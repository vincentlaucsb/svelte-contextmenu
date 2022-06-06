/** @typedef {typeof __propDef.props}  MenuItemProps */
/** @typedef {typeof __propDef.events}  MenuItemEvents */
/** @typedef {typeof __propDef.slots}  MenuItemSlots */
export default class MenuItem extends SvelteComponentTyped<{
    [x: string]: any;
    autoclose?: boolean | undefined;
    href?: string | undefined;
}, {
    click: MouseEvent;
} & {
    [evt: string]: CustomEvent<any>;
}, {
    default: {};
}> {
}
export type MenuItemProps = typeof __propDef.props;
export type MenuItemEvents = typeof __propDef.events;
export type MenuItemSlots = typeof __propDef.slots;
import { SvelteComponentTyped } from "svelte";
declare const __propDef: {
    props: {
        [x: string]: any;
        autoclose?: boolean | undefined;
        href?: string | undefined;
    };
    events: {
        click: MouseEvent;
    } & {
        [evt: string]: CustomEvent<any>;
    };
    slots: {
        default: {};
    };
};
export {};
