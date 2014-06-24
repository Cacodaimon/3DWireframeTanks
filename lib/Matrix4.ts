/**
 * 4x4 matrix class.
 *
 * @author Guido Krömer <mail 64 cacodaemon 46 de>
 */
class Matrix4 implements ICloneable<Matrix4> {

    /**
     * Creates a 4x4 matrix.
     *
     * @param {number} m11
     * @param {number} m12
     * @param {number} m13
     * @param {number} m14
     * @param {number} m21
     * @param {number} m22
     * @param {number} m23
     * @param {number} m24
     * @param {number} m31
     * @param {number} m32
     * @param {number} m33
     * @param {number} m34
     * @param {number} m41
     * @param {number} m42
     * @param {number} m43
     * @param {number} m44
     */
    constructor(public m11: number = 0.0, public m12: number = 0.0, public m13: number = 0.0, public m14: number = 0.0,
                public m21: number = 0.0, public m22: number = 0.0, public m23: number = 0.0, public m24: number = 0.0,
                public m31: number = 0.0, public m32: number = 0.0, public m33: number = 0.0, public m34: number = 0.0,
                public m41: number = 0.0, public m42: number = 0.0, public m43: number = 0.0, public m44: number = 0.0) {
    }

    /**
     * Creates a new identity 4x4 matrix.
     * @returns {Matrix4}
     */
    public static identity(): Matrix4 {
        return new Matrix4( 1.0, 0.0, 0.0, 0.0,
                            0.0, 1.0, 0.0, 0.0,
                            0.0, 0.0, 1.0, 0.0,
                            0.0, 0.0, 0.0, 1.0)
    }

    /**
     * Multiply two matrices,
     *
     * @param {Matrix4} a
     * @param {Matrix4} b
     * @returns {Matrix4}
     */
    public static multiply(a: Matrix4, b: Matrix4): Matrix4 {
        return new Matrix4(
            a.m11 * b.m11 + a.m21 * b.m12 + a.m31 * b.m13 + a.m41 * b.m14,
            a.m12 * b.m11 + a.m22 * b.m12 + a.m32 * b.m13 + a.m42 * b.m14,
            a.m13 * b.m11 + a.m23 * b.m12 + a.m33 * b.m13 + a.m43 * b.m14,
            a.m14 * b.m11 + a.m24 * b.m12 + a.m34 * b.m13 + a.m44 * b.m14,

            a.m11 * b.m21 + a.m21 * b.m22 + a.m31 * b.m23 + a.m41 * b.m24,
            a.m12 * b.m21 + a.m22 * b.m22 + a.m32 * b.m23 + a.m42 * b.m24,
            a.m13 * b.m21 + a.m23 * b.m22 + a.m33 * b.m23 + a.m43 * b.m24,
            a.m14 * b.m21 + a.m24 * b.m22 + a.m34 * b.m23 + a.m44 * b.m24,

            a.m11 * b.m31 + a.m21 * b.m32 + a.m31 * b.m33 + a.m41 * b.m34,
            a.m12 * b.m31 + a.m22 * b.m32 + a.m32 * b.m33 + a.m42 * b.m34,
            a.m13 * b.m31 + a.m23 * b.m32 + a.m33 * b.m33 + a.m43 * b.m34,
            a.m14 * b.m31 + a.m24 * b.m32 + a.m34 * b.m33 + a.m44 * b.m34,

            a.m11 * b.m41 + a.m21 * b.m42 + a.m31 * b.m43 + a.m41 * b.m44,
            a.m12 * b.m41 + a.m22 * b.m42 + a.m32 * b.m43 + a.m42 * b.m44,
            a.m13 * b.m41 + a.m23 * b.m42 + a.m33 * b.m43 + a.m43 * b.m44,
            a.m14 * b.m41 + a.m24 * b.m42 + a.m34 * b.m43 + a.m44 * b.m44
        );
    }

    /**
     * Transforms a Vector3 with the given 4x4 matrix.
     *
     * @param v The vector to transform.
     * @param m The transform matrix to use.
     * @returns {Vector3}
     */
    public static transform(v: Vector3, m: Matrix4): Vector3 {
        return new Vector3(
            (v.x * m.m11) + (v.y * m.m21) + (v.z * m.m31) + m.m41,
            (v.x * m.m12) + (v.y * m.m22) + (v.z * m.m32) + m.m42,
            (v.x * m.m13) + (v.y * m.m23) + (v.z * m.m33) + m.m43
        );
    }

    /**
     * Creates a X rotation matrix with the given angle.
     *
     * @param angle The rotation angle.
     * @returns {Matrix4}
     */
    public static rotateX(angle: number): Matrix4 {
        if (0.0 == Math.abs(angle)) {
            return Matrix4.identity();
        }

        var cos: number = Math.cos(angle);
        var sin: number = Math.sin(angle);

        return new Matrix4(
            cos, 0.0, sin, 0.0,
            0.0, 1.0, 0.0, 0.0,
            -sin, 0.0, cos, 0.0,
            0.0, 0.0, 0.0, 1.0
        );
    }

    /**
     * Creates a Y rotation matrix with the given angle.
     *
     * @param angle The rotation angle.
     * @returns {Matrix4}
     */
    public static rotateY(angle: number): Matrix4 {
        if (0 == Math.abs(angle)) {
            return Matrix4.identity();
        }

        var cos: number = Math.cos(angle);
        var sin: number = Math.sin(angle);

        return new Matrix4(
            1.0, 0.0, 0.0, 0.0,
            0.0, cos,-sin, 0.0,
            0.0, sin, cos, 0.0,
            0.0, 0.0, 0.0, 1.0
        );
    }

    /**
     * Creates a Z rotation matrix with the given angle.
     *
     * @param angle The rotation angle.
     * @returns {Matrix4}
     */
    public static rotateZ(angle: number): Matrix4 {
        if (0.0 == Math.abs(angle)) {
            return Matrix4.identity();
        }

        var cos: number = Math.cos(angle);
        var sin: number = Math.sin(angle);

        return new Matrix4(
            cos,-sin, 0.0, 0.0,
            sin, cos, 0.0, 0.0,
            0.0, 0.0, 1.0, 0.0,
            0.0, 0.0, 0.0, 1.0
        );
    }

    /**
     * Creates a XY rotation matrix with the given angle.
     *
     * @param angleX The x rotation angle.
     * @param angleY The y rotation angle.
     * @returns {Matrix4}
     */
    public static rotateXY (angleX: number, angleY: number): Matrix4 {
        return Matrix4.multiply(Matrix4.rotateX(angleX), Matrix4.rotateY(angleY));
    }

    /**
     * Creates a XZ rotation matrix with the given angle.
     *
     * @param angleX The x rotation angle.
     * @param angleZ The z rotation angle.
     * @returns {Matrix4}
     */
    public static rotateXZ (angleX: number, angleZ: number): Matrix4 {
        return Matrix4.multiply(Matrix4.rotateX(angleX), Matrix4.rotateZ(angleZ));
    }

    /**
     * Creates a XYZ rotation matrix with the given angle.
     *
     * @param angleX The x rotation angle.
     * @param angleY The y rotation angle.
     * @param angleZ The z rotation angle.
     * @returns {Matrix4}
     */
    public static rotateXYZ (angleX: number, angleY: number, angleZ: number): Matrix4 {
        return Matrix4.multiply(Matrix4.rotateXY(angleX, angleY), Matrix4.rotateZ(angleZ));
    }

    /**
     * Creates a scale matrix using the given vector.
     *
     * @param scale The scale vector.
     * @returns {Matrix4}
     */
    public static scale (scale: Vector3): Matrix4 {
        return new Matrix4(
            scale.x,     0.0,     0.0, 0.0,
                0.0, scale.y,     0.0, 0.0,
                0.0,     0.0, scale.z, 0.0,
                0.0,     0.0,     0.0, 1.0
        );
    }

    /**
     * Creates a translation matrix using the given vector.
     *
     * @param translate The translation vector.
     * @returns {Matrix4}
     */
    public static translate (translate: Vector3): Matrix4 {
        return new Matrix4(
            1.0, 0.0, 0.0, 0.0,
            0.0, 1.0, 0.0, 0.0,
            0.0, 0.0, 1.0, 0.0,
            translate.x, translate.y, translate.z, 1.0
        );
    }

    /**
     * Creates a look at matrix, useful for rotation the world towards the camera.
     *
     * @param cameraPosition The camera position vector.
     * @param cameraTarget The look at vector.
     * @param cameraUpVector The world up vector.
     * @returns {Matrix4}
     */
    public static lookAt(cameraPosition: Vector3, cameraTarget: Vector3,  cameraUpVector: Vector3): Matrix4 {
        var vector = Vector3.norm(Vector3.minus(cameraPosition, cameraTarget));
        var vector2 = Vector3.norm(Vector3.cross(cameraUpVector, vector));
        var vector3 = Vector3.cross(vector, vector2);

        return new Matrix4(
            vector2.x, vector3.x, vector.x, 0.0,
            vector2.y, vector3.y, vector.y, 0.0,
            vector2.z, vector3.z, vector.z, 0.0,
            -Vector3.dot(vector2, cameraPosition), -Vector3.dot(vector3, cameraPosition), -Vector3.dot(vector, cameraPosition), 1.0
        );
    }

    /**
     * Creates a perspective matrix.
     *
     * @param near The near view distance.
     * @param far The far view distance.
     * @param fov The view of field.
     * @returns {Matrix4}
     */
    public static perspective (near: number, far: number, fov: number): Matrix4 {
        var a: number = 1 / Math.tan(.5 * fov);
        var b: number = far / (far - near);

        return new Matrix4(
            a, 0.0,   0.0, 0.0,
            0.0,   a,   0.0, 0.0,
            0.0, 0.0,     b, 0.0,
            0.0, 0.0,-b * a, 1.0
        );
    }

    /**
     * Creates a perspective matrix.
     *
     * @param screen The screen.
     * @param nearPlaneDistance Distance of the near clipping plane.
     * @param farPlaneDistance Distance of the far clipping plane.
     * @returns {Matrix4}
     */
    public static createPerspective(screen: GameScreen, nearPlaneDistance: number, farPlaneDistance: number): Matrix4
    {
        var result: Matrix4 = Matrix4.identity();
        result.m11 = (2.0 * nearPlaneDistance) / screen.width;
        result.m12 = result.m13 = result.m14 = 0.0;
        result.m22 = (2.0 * nearPlaneDistance) / screen.height;
        result.m21 = result.m23 = result.m24 = 0.0;
        result.m33 = farPlaneDistance / (nearPlaneDistance - farPlaneDistance);
        result.m31 = result.m32 = 0.0;
        result.m34 = -1.0;
        result.m41 = result.m42 = result.m44 = 0.0;
        result.m43 = (nearPlaneDistance * farPlaneDistance) / (nearPlaneDistance - farPlaneDistance);

        return result;
    }

    /**
     * The matrix as json string.
     *
     * @returns {string}
     */
    public toString(): string {
        return JSON.stringify(this);
    }

    /**
     * Clones the matrix.
     *
     * @returns {Matrix4}
     */
    public clone(): Matrix4 {
        return new Matrix4(
            this.m11, this.m12, this.m13, this.m14,
            this.m21, this.m22, this.m23, this.m24,
            this.m31, this.m32, this.m33, this.m34,
            this.m41, this.m42, this.m43, this.m44
        );
    }
}