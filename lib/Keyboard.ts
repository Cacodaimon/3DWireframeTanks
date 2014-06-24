/**
 * Keyboard abstraction layer class.
 *
 * @author Guido Krömer <mail 64 cacodaemon 46 de>
 */
class Keyboard {

    /**
     * Array of pressed keys.
     *
     * @type {Array<boolean>}
     */
    private static pressed: Array<boolean> = [];

    public static LEFT:number = 37;

    public static UP:number = 38;

    public static RIGHT:number = 39;

    public static DOWN:number = 40;

    public static ENTER:number = 13;

    public static SPACE:number = 32;

    public static PAGE_UP:number = 33;

    public static PAGE_DOWN:number = 34;

    public static W:number = 87;

    public static A:number = 65;

    public static S:number = 83;

    public static D:number = 68;

    /**
     * Binds the keyup adn keydown events to this keyboard class.
     */
    public static init(): void {
        window.addEventListener('keyup', function(event) {
            Keyboard.onKeyUp(event);
        }, false);
        window.addEventListener('keydown', function(event) {
            Keyboard.onKeyDown(event);
        }, false);
    }

    /**
     * Returns true if the given key is pressed.
     *
     * @param keyCode The key's code.
     *
     * @returns {boolean}
     */
    public static isDown(keyCode: number): boolean {
        return this.pressed[keyCode];
    }

    /**
     * Manually sets the pressed key to false.
     *
     * @param keyCode The key's code.
     */
    public static reset(keyCode: number): void {
        this.pressed[keyCode] = false;
    }

    /**
     * Called by an keydown KeyboardEvent event.
     *
     * @param event The keyboard event.
     */
    public static onKeyDown(event: KeyboardEvent): void {
        this.pressed[event.keyCode] = true;
    }

    /**
     * Called by an keyup KeyboardEvent event.
     *
     * @param event The keyboard event.
     */
    public static onKeyUp(event: KeyboardEvent): void {
        delete this.pressed[event.keyCode];
    }
}
