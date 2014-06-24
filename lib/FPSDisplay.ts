/**
 * Displays the current frames per second to the screen.
 *
 * @author Guido Krömer <mail 64 cacodaemon 46 de>
 */
class FPSDisplay extends GameObject {

    /**
     * Current second.
     */
    private seconds: number;

    /**
     * Current frames per second.
     */
    private fps: number;

    /**
     * Next second's frames per second.
     */
    private fpsCounter: number;
 
    public init(gameManager: GameManager): void {
        super.init(gameManager);
        this.seconds = -1;
        this.fps = 0;
    }
 
    public update(delta: number): void {
        var currentSeconds = new Date().getSeconds();

        if (this.seconds == currentSeconds) {
            this.fpsCounter++;
            return;
        }

        this.fps = this.fpsCounter;
        this.fpsCounter = 0;
        this.seconds = currentSeconds;
    }
 
    public draw(ctx: CanvasRenderingContext2D): void {
        ctx.fillStyle = '#f00';
        ctx.font = 'bold 14px Curier';
        this.fps && ctx.fillText('' + this.fps, 10, 15);
    }
}