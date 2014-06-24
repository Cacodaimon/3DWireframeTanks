/**
 * Class for managing a game loop with updating and drawing.
 *
 * @author Guido Krömer <mail 64 cacodaemon 46 de>
 */
class GameManager {

    /**
     * Internally used for calculating the delta.
     */
    private lastTimeStamp: number;

    /**
     * The delta in milliseconds between two update/draw cycles.
     */
    private delta: number;

    /**
     * Array of game objects to update and draw.
     */
    private gameObjects: Array<GameObject>;

    /**
     * Determines if the init method has been called.
     */
    private initialized: boolean = false;

    /**
     * The game screen dimension.
     */
    public screen: GameScreen;

    /**
     * The 2D rendering context passed to the game objects for drawing.
     */
    public ctx: CanvasRenderingContext2D;

    /**
     * Creates a game manager instance.
     */
    constructor() {
        this.lastTimeStamp = new Date().getTime();
        this.delta = 0.0;
        this.gameObjects = [];
    }

    /**
     * Adds a new game object.
     *
     * @param gameObject The gae object to add.
     */
    public add(gameObject: GameObject) {
        this.initialized && gameObject.init(this);
        this.gameObjects.push(gameObject);
    }

    /**
     * Initializes the game manager an all assigned game objects.
     *
     * @param canvas The canvas element to use for drawing.
     */
    public init(canvas: HTMLCanvasElement) {
        this.screen = new GameScreen(canvas.width, canvas.height);

        this.ctx = canvas.getContext('2d');
        this.initialized = true;

        for (var i: number = this.gameObjects.length - 1; i >= 0; i--) {
            this.gameObjects[i].init(this);
        }
    }

    /**
     * Called from outside for updating all game objects.
     */
    public update() {
        for (var i: number = this.gameObjects.length - 1; i >= 0; i--) {
            this.gameObjects[i].update(this.delta);
        }
    }

    /**
     * Called from outside for drawing all game objects.
     */
    public draw() {
        for (var i: number = this.gameObjects.length - 1; i >= 0; i--) {
            this.gameObjects[i].draw(this.ctx);
        }
    }

    /**
     * Called from outside before update and draw.
     */
    public timerStart() {
        this.delta = new Date().getTime() - this.lastTimeStamp;
    }

    /**
     * Called from outside after draw and update.
     */
    public timerEnd() {
        this.lastTimeStamp = new Date().getTime();
    }
}