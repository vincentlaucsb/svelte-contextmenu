declare class Settings {
    /** Use Bootstrap 5 CSS styling */
    static BootstrapCss(): Settings;
    /** Use default CSS styling */
    static DefaultCss(): Settings;
    Divider: {
        Class: string[];
    };
    Menu: {
        Class: string[];
        VisibleClass: string[];
    };
    Item: {
        Class: string[];
    };
}
export default Settings;
