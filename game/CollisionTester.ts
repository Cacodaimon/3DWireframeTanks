/**
 * Utility for simple 2D collision checking.
 *
 * @author Guido Krömer <mail 64 cacodaemon 46 de>
 */
class CollisionTester {

    /**
     * A list of game objects, the environment, to check against a give object.
     */
    public collidabelGameObjects: Array<Object3D>;

    constructor () {
        this.collidabelGameObjects = [];
    }

    /**
     * Checks if the given objects collides with the environment.
     *
     * @param position The object's position.
     * @param radius The object's radius.
     * @param scale The object's scale.
     * @param axis The axis to check fo collisions.
     * @return {boolean}
     */
    public check(position: Vector3, radius: number, scale: number, axis: string = 'x'): boolean{
        for (var i = this.collidabelGameObjects.length - 1; i >= 0; i--) {
            var obstacle: Object3D = this.collidabelGameObjects[i];
            var distance: number = Math.abs(Vector3.mag(Vector3.minus(obstacle.position, position)));

            if (distance < obstacle.mesh.radius * obstacle.scale.getAxis(axis) + radius + scale) {
                return true;
            }
        }

        return false;
    }
}