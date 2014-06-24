/**
 * 3D plane class.
 *
 * @author Guido Krömer <mail 64 cacodaemon 46 de>
 */
class Plane {

    /**
     * Creates a plane using d as distance and normal as direction.
     *
     * @param d The plane's distance.
     * @param normal The plane's normal vector.
     */
    public constructor(public d: number, public normal: Vector3) {
    }

    /**
     * Returns the point where the given line intersects with this plane.
     *
     * @param line The line to check for an intersection.
     * @returns {Vector3} The intersection point.
     */
    public intersectLine(line: Line): Vector3 {
        return Plane.intersectWithLine(this, line);
    }

    /**
     * Returns the point where the given line intersects with the given plane.
     *
     * @param plane The plane to check for an intersection with the given line.
     * @param line The line to check for an intersection with the given plane.
     * @returns {Vector3} The intersection point.
     */
    public static intersectWithLine(plane: Plane, line: Line): Vector3 {
        var ba: Vector3 = Vector3.minus(line.a, line.b);
        var nDotA: number = Vector3.dot(plane.normal, line.a);
        var nDotBA: number = Vector3.dot(plane.normal, ba);

        return Vector3.plus(line.a, Vector3.times((plane.d - nDotA) / nDotBA, ba)); //a + (((d - nDotA)/nDotBA) * ba)
    }
}