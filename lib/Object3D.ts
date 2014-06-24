/**
 * Represents a object in the 3D world using a mesh with position, rotation and scale.
 *
 * @author Guido Krömer <mail 64 cacodaemon 46 de>
 */
class Object3D {

    /**
     * Creates a 3D object.
     *
     * @param mesh The mesh to use.
     * @param position The object's position.
     * @param rotation The object's rotation.
     * @param scale The object's scale.
     * @param color The object's color, if no color is provided a random color will be used.
     * @see http://www.paulirish.com/2009/random-hex-color-code-snippets/
     */
    constructor(
        public mesh: Mesh,
        public position: Vector3,
        public rotation: Vector3,
        public scale: Vector3,
        public color: string = null) {
        this.color = color || '#' + Math.floor(Math.random()*16777215).toString(16);
    }

    /**
     * Returns the object's world matrix.
     *
     * @returns {Matrix4}
     */
    public getWorldMatrix(): Matrix4 {
        return Matrix4.multiply(
            Matrix4.translate(this.position),
            Matrix4.multiply(
                Matrix4.rotateXYZ(this.rotation.x, this.rotation.y, this.rotation.z),
                Matrix4.scale(this.scale)
            )
        );
    }
}