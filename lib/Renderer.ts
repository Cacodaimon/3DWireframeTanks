/**
 * A quick and especially dirty wire frame renderer.
 * It displays the given Object3D's on the GameManager's canvas.
 *
 * @author Guido Krömer <mail 64 cacodaemon 46 de>
 */
class Renderer extends GameObject {

    /**
     * The used camera.
     *
     * @type {Camera}
     */
    public camera: Camera;

    /**
     * List of objects to render.
     *
     * @type {Array<Object3D>}
     */
    public renderList: Array<Object3D> = [];

    /**
     *
     * @type {LineClipping}
     */
    private lineClipping: LineClipping;

    /**
     * Init the renderer.
     *
     * @param {GameManager} gameManager
     */
    public init (gameManager: GameManager): void {
        super.init(gameManager);
        this.lineClipping = new LineClipping(new GameScreen(640, 480));
        console.log(gameManager.screen);
        gameManager.ctx.lineWidth = 1;
        this.camera = new Camera(new Vector3(6000,6000, -5000), new Vector3(1, 1, -1));
    }

    /**
     * Draws the scene on the given canvas.
     *
     * @param {CanvasRenderingContext2D} ctx
     */
    public draw (ctx: CanvasRenderingContext2D): void {
        var width: number = this.gameManager.screen.width;
        var height: number = this.gameManager.screen.height;
        var halfWidth: number = width / 2;
        var halfHeight: number = height / 2;

        ctx.clearRect(0, 0, width, height);

        var view: Matrix4 = this.camera.getCameraMatrix();

        var lines: Array<Line> = [];
        for (var i = this.renderList.length - 1; i >= 0; i--) {
            this.renderMesh(lines, view, this.renderList[i], halfWidth, halfHeight);
        }

        lines = lines.sort(function (a, b) {
            return a.midPoint.z - b.midPoint.z;
        });

        ctx.lineJoin="round";
        ctx.lineWidth=2;
            ctx.beginPath();
        for (var i = lines.length - 1; i >= 0; i--) {
            if (ctx.strokeStyle != lines[i].color) {
                ctx.stroke();
                ctx.strokeStyle = lines[i].color;
                ctx.beginPath();
            }
            ctx.moveTo(lines[i].a.x, lines[i].a.y);
            ctx.lineTo(lines[i].b.x, lines[i].b.y);
        }
        ctx.stroke();
    }

    /**
     * Converts the mesh's lines to projected lines which gets appended to the given lines array.
     *
     * @param lines The lines array to append the mesh's projected lines.
     * @param view The view matrix.
     * @param object3D The object to render.
     * @param halfWidth The half screen width.
     * @param halfHeight The half screen height.
     */
    private renderMesh (lines: Array<Line>, view: Matrix4, object3D: Object3D, halfWidth: number, halfHeight: number): void {
        var combined: Matrix4 = Matrix4.multiply(view, object3D.getWorldMatrix());

        var vertices: Array<Vector3> = new Array(object3D.mesh.vertices.length);
        for (var i = object3D.mesh.vertices.length - 1; i >= 0; i--) {
            vertices[i] = Matrix4.transform(object3D.mesh.vertices[i], combined);
        }

        for (var i = object3D.mesh.lines.length - 1; i >= 0; i--) {
            var line: Array<number> = object3D.mesh.lines[i];
            var a = vertices[line[0]];
            var b = vertices[line[1]];

            if (a.z < 0 && b.z < 0) {
                continue;
            }

            if (a.z < 0) {
                a = this.camera.nearClippingPlane.intersectLine(new Line(b, a));
            }

            if (b.z < 0) {
                b = this.camera.nearClippingPlane.intersectLine(new Line(a, b));
            }

            //disabled runs on chrome faster without clipping
            //this.lineClipping.clip(a, b);

            var pointA: Vector3 = new Vector3(2000.0 * a.x / a.z + halfWidth, 2000.0 * a.y / a.z + halfHeight, a.z);
            var pointB: Vector3 = new Vector3(2000.0 * b.x / b.z + halfWidth, 2000.0 * b.y / b.z + halfHeight, b.z);

            lines.push(new Line(pointA, pointB, object3D.color));
        }
    }
}