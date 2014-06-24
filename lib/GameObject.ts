/**
 * A game object which gets managed by the game manager.
 *
 * @author Guido Krömer <mail 64 cacodaemon 46 de>
 */
class GameObject {

    /**
     * The assigned game manager instance.
     */
    public gameManager: GameManager;

    /**
     * Called by the game manager.
     * @param gameManager The manager instance which called init.
     */
    public init(gameManager: GameManager): void {
        this.gameManager = gameManager;
    }

    /**
     * Updates the game object.
     *
     * @param delta The time delta passed between now and the last update.
     * @abstract
     */
    public update(delta: number): void { }

    /**
     * Draws the game object.
     *
     * @param ctx
     * @abstract
     */
    public draw(ctx: CanvasRenderingContext2D): void { }
}