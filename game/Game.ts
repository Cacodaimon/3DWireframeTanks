/**
 * The Game class creates a GameManager for the timing and a renderer for the nice 3D stuff and puts all together.
 *
 * @author Guido Krömer <mail 64 cacodaemon 46 de>
 */
class Game {

    /**
     * The game manager to use.
     */
    public gameManager: GameManager;

    /**
     * The game's renderer.
     */
    private renderer: Renderer;

    /**
     * Teh games player.
     */
    private player: Player;

    /**
     * Utility for simple circle based collsion checking.
     */
    private collisionTester: CollisionTester;

    constructor() {
        this.collisionTester = new CollisionTester();
        this.gameManager = new GameManager();
        this.renderer = new Renderer();
    }

    public run(canvas: HTMLCanvasElement): void {
        this.gameManager.add(this.renderer);
        this.gameManager.init(canvas);

        this.setUpTerrain();
        this.setUpObstacles();

        this.player = new Player(this.renderer.camera, this.collisionTester, new Object3D(
            new Tank(),
            new Vector3(1.0, 1.0, -1.0),
            new Vector3(0.0, 0.0, Math.PI * -0.5),
            new Vector3(90.0, 90.0, 90.0),
            '#ff0000'
        ));

        this.renderer.renderList.push(this.player.model);
        this.gameManager.add(this.player);


        this.renderer.renderList.push(new Object3D(new Tank(),
                                                   new Vector3(100.0, 1.0, -1.0),
                                                   new Vector3(0.0, 0.0, 0.0),
                                                   new Vector3(90.0, 90.0, 90.0),
                                                   '#ff0000'));

        var that = this;
        (function animloop(){
            window.requestAnimationFrame(animloop);
            that.gameManager.timerStart();
            that.gameManager.update();
            that.gameManager.draw();
            that.gameManager.timerEnd();
        })();

    }

    private setUpObstacles(): void {
        var mesh: Array<Mesh> = [new Cube(), new Pyramid()];
        var scale: number = 90;
        var i = 0;
        for (var x = -400; x < 400; x += 90) {
            for (var y = -400; y < 400; y += 90) {
                var obstacle: Object3D = new Object3D(
                    mesh[i++%2],
                    new Vector3(x * scale / 2, y * scale / 2, 0),
                    new Vector3(),
                    new Vector3(scale, scale, scale),
                    ['#ffff00', '#00ff00'][i%2]
                );

                this.renderer.renderList.push(obstacle);
                this.collisionTester.collidabelGameObjects.push(obstacle);
            }
        }
    }

    private setUpTerrain(): void {

        this.renderer.renderList.push(new Object3D(
            new Terrain(),
            new Vector3(),
            new Vector3(Math.PI / 2, Math.PI / 2, Math.PI / 2),
            new Vector3(100000.0, 100000.0, 100000.0),
            '#0000ff'
        ));

        //Planet
        var planetPosition: Vector3 = new Vector3(80000.0, 80000.0, -24000);

        this.renderer.renderList.push(new Object3D(
            new Circle(),
            planetPosition,
            new Vector3(Math.PI / 2, Math.PI / 4),
            new Vector3(10000.0, 10000.0, 10000.0),
            '#ffff00'
        ));

        this.renderer.renderList.push(new Object3D(
            new Circle(),
            planetPosition,
            new Vector3(Math.PI / 2, Math.PI / 4, Math.PI / 2),
            new Vector3(16000.0, 16000.0, 16000.0),
            '#ffaa00'
        ));

        this.renderer.renderList.push(new Object3D(
            new Circle(),
            planetPosition,
            new Vector3(Math.PI / 2, Math.PI / 4, Math.PI / 2),
            new Vector3(17000.0, 17000.0, 17000.0),
            '#ffaa00'
        ));
        //End of Planet
    }
}