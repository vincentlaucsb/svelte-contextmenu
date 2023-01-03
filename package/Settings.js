class Settings {
    /** Use Bootstrap 5 CSS styling */
    static BootstrapCss() {
        let ret = new Settings();
        ret.Divider.Class.push("dropdown-divider");
        ret.Menu.Class.push("dropdown-menu");
        ret.Item.Class.push("dropdown-item");
        return ret;
    }
    /** Use default CSS styling */
    static DefaultCss() {
        const defaultClassName = "context-menu-default";
        let ret = new Settings();
        ret.Divider.Class.push(defaultClassName);
        ret.Menu.Class.push(defaultClassName);
        ret.Item.Class.push(defaultClassName);
        return ret;
    }
    Divider = {
        "Class": ["context-menu-divider"]
    };
    Menu = {
        "Class": ["context-menu"],
        "VisibleClass": ["show"]
    };
    Item = {
        "Class": ["context-menu-item"]
    };
}
;
export default Settings;
