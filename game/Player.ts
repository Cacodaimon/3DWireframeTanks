/**
 * A movable player.
 *
 * @author Guido Krömer <mail 64 cacodaemon 46 de>
 */
class Player extends GameObject {

    /**
     * The player's velocity.
     *
     * @type {Vector3}
     */
    public velocity: Vector3;

    /**
     * The player's current acceleration.
     *
     * @type {number}
     */
    public acceleration: number = 0;

    /**
     * The environment's friction.
     *
     * @type {number}
     */
    public friction: number = 0.95;

    /**
     * Temp helper.
     *
     * @type {number}
     */
    private oldRotation: number;

    /**
     * Creates a player.
     *
     * @param camera The players camera.
     * @param collisionTester The environment collison checker.
     * @param model The players model.
     */
    constructor(public camera: Camera, public collisionTester: CollisionTester, public model: Object3D) {
        super();
    }

    public init(gameManager: GameManager): void {
        Keyboard.init();
    }

    update(delta: number): void {
        if (Keyboard.isDown(Keyboard.LEFT)) {
            this.oldRotation = this.model.rotation.z;
            this.model.rotation.z += delta * 0.001;
        } else if (Keyboard.isDown(Keyboard.RIGHT)) {
            this.oldRotation = this.model.rotation.z;
            this.model.rotation.z -= delta * 0.001;
        }

        if (Keyboard.isDown(Keyboard.UP)) {
            this.acceleration += delta;
        } else if (Keyboard.isDown(Keyboard.DOWN)) {
            this.acceleration -= delta;
        }

        this.acceleration *= this.friction;

        this.velocity = Vector3.times(this.acceleration, Matrix4.transform(new Vector3(1.0, 0.0, 0.0), Matrix4.rotateZ(this.model.rotation.z)));
        var position: Vector3 = Vector3.plus(this.model.position, this.velocity);

        if (!this.collisionTester.check(position, this.model.mesh.radius, this.model.scale.x)) {
            this.model.position = position.clone();
            position.z += this.model.scale.z * 0.35;
            var lookAt: Vector3 = Matrix4.transform(new Vector3(-1.0, 0.0, 0.0), Matrix4.rotateZ(this.model.rotation.z));
            this.camera.setPositionAndLookAt(position, Vector3.plus(position, lookAt));
        } else {
            this.acceleration = 0.0;
            this.model.rotation.z = this.oldRotation;
        }
    }
}