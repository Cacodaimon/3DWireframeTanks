/**
 * Vector 3 class.
 */
class Vector3 implements ICloneable<Vector3> {
    /**
     * Creates a vector 3.
     *
     * @param x The vector's x axis.
     * @param y The vector's y axis.
     * @param z The vector's z axis.
     */
    constructor (public x: number = 0.0, public y: number = 0.0, public z: number = 0.0) {
    }

    /**
     * Sets the value for the given axis.
     * Valid values for axis are: x, y, or z.
     *
     * @param axis The axis to set.
     * @param value The axis value.
     * @throws An exception if the given axis is not x, y or z.
     */
    public setAxis(axis: string, value: number): void {
        switch (axis) {
            case 'x':
                this.x = value;
                return;
            case 'y':
                this.y = value;
                return;
            case 'z':
                this.z = value;
                return;
        }

        throw "Invalid axis given, x,y or z are valid axis!";
    }

    /**
     * Gets the value for the given axis.
     * Valid values for axis are: x, y, or z.
     *
     * @param axis The axis to set.
     * @throws An exception if the given axis is not x, y or z.
     */
    public getAxis(axis: string): number {
        switch (axis) {
            case 'x':
                return this.x;
            case 'y':
                return this.y;
            case 'z':
                return this.z;
        }

        throw "Invalid axis given, x,y or z are valid axis!";
    }

    /**
     * Multiply the given vector 3 with a scalar.
     *
     * @param scalar The scalar
     * @param v The vector.
     * @returns {Vector3}
     */
    public static times (scalar: number, v: Vector3): Vector3 {
        return new Vector3(scalar * v.x, scalar * v.y, scalar * v.z);
    }

    /**
     * Multiply two vectors.
     *
     * @param a The first vector.
     * @param b The second vector.
     * @returns {Vector3}
     */
    public static multiply (a: Vector3, b: Vector3): Vector3 {
        return new Vector3(a.x * b.x, a.y * b.y, a.z * b.z);
    }

    /**
     * Subtracts two vectors.
     *
     * @param a The first vector.
     * @param b The second vector.
     * @returns {Vector3}
     */
    public static minus (a: Vector3, b: Vector3): Vector3 {
        return new Vector3(a.x - b.x, a.y - b.y, a.z - b.z);
    }

    /**
     * Adds two vectors.
     *
     * @param a The first vector.
     * @param b The second vector.
     * @returns {Vector3}
     */
    public static plus (a: Vector3, b: Vector3): Vector3 {
        return new Vector3(a.x + b.x, a.y + b.y, a.z + b.z);
    }

    /**
     * Returns the both vectors dot product.
     *
     * @param a The first vector.
     * @param b The second vector.
     * @returns {number} The dot product.
     */
    public static dot (a: Vector3, b: Vector3): number {
        return a.x * b.x + a.y * b.y + a.z * b.z;
    }

    /**
     * Returns the vector's magnitude.
     *
     * @param v The vector 3.
     * @returns {number} The given vector magnitude.
     */
    public static mag (v: Vector3): number {
        return Math.sqrt(v.x * v.x + v.y * v.y + v.z * v.z);
    }

    /**
     * Normalizes the given vector.
     *
     * @param v The vector to normalize.
     * @returns {Vector3} The normalized vector.
     */
    public static norm (v: Vector3): Vector3 {
        var mag: number = Vector3.mag(v);
        return Vector3.times(mag === 0.0 ? Number.POSITIVE_INFINITY : 1.0 / mag, v);
    }

    /**
     * Calculates the vector 3 cross product of the both given vectors.
     *
     * @param a The first vector.
     * @param b The second vector.
     * @returns {Vector3} The cross product.
     */
    public static cross (a: Vector3, b: Vector3): Vector3 {
        return new Vector3(a.y * b.z - a.z * b.y,
                           a.z * b.x - a.x * b.z,
                           a.x * b.y - a.y * b.x);
    }

    /**
     * Returns true if the both vectors are equal by their axis values.
     *
     * @param other The vector to test with.
     * @returns {boolean}
     */
    public equals(other: Vector3): boolean {
        return this.x === other.x && this.y === other.y && this.z === other.z;
    }

    /**
     * Returns the current vector as JSON string.
     *
     * @returns {string}
     */
    public toString(): string {
        return JSON.stringify(this);
    }

    /**
     * Clones the current vector.
     *
     * @returns {Vector3}
     */
    public clone(): Vector3 {
        return new Vector3(this.x, this.y, this.z);
    }
}