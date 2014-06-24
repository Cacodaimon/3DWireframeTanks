/**
 * A simple colored line from a Vector3 to another Vector3.
 *
 * @author Guido Krömer <mail 64 cacodaemon 46 de>
 */
class Line implements ICloneable<Line> {

    /**
     * The lines mid point.
     */
    public midPoint: Vector3;

    /**
     * Creates a new line.
     *
     * @param a The start point.
     * @param b The end point.
     * @param color The line's color.
     */
    constructor(public a: Vector3, public b: Vector3, public color: string = '#ffffff') {
        this.midPoint = new Vector3 (
            this.a.x + this.b.x / 2,
            this.a.y + this.b.y / 2,
            this.a.z + this.b.z / 2
        );
    }

    /**
     * 2D intersect check for the x and y axis.
     *
     * @param a The first line.
     * @param b The second line.
     * @param intersectionPoint The intersection point if a intersection was detected.
     * @returns {boolean} True if the two given lines intersects, otherwise false.
     */
    public static intersectsXY(a: Line, b: Line, intersectionPoint: Vector3): boolean {
        return Line.intersects(a, b, intersectionPoint, 'x', 'y');
    }

    /**
     * 2D intersect check for the x and z axis.
     *
     * @param a The first line.
     * @param b The second line.
     * @param intersectionPoint The intersection point if a intersection was detected.
     * @returns {boolean} True if the two given lines intersects, otherwise false.
     */
    public static intersectsXZ(a: Line, b: Line, intersectionPoint: Vector3): boolean {
        return Line.intersects(a, b, intersectionPoint, 'x', 'z');
    }

    /**
     * 2D intersect check for the y and z axis.
     *
     * @param a The first line.
     * @param b The second line.
     * @param intersectionPoint The intersection point if a intersection was detected.
     * @returns {boolean} True if the two given lines intersects, otherwise false.
     */
    public static intersectsYZ(a: Line, b: Line, intersectionPoint: Vector3): boolean {
        return Line.intersects(a, b, intersectionPoint, 'y', 'z');
    }

    /**
     * 2D intersect check for the both specified axis.
     *
     * @param a The first line.
     * @param b The second line.
     * @param intersectionPoint The intersection point if a intersection was detected.
     * @param axisA The axis name: x, y or z.
     * @param axisB The axis name: x, y or z.
     * @returns {boolean} True if the two given lines intersects, otherwise false.
     * @see http://funcodegames.blogspot.de/2010/06/line-segment-intersection-detection-in.html
     */
    private static intersects(a: Line, b: Line, intersectionPoint: Vector3, axisA: string, axisB: string): boolean {
        var firstLineSlopeX: number = a.b.getAxis(axisA) - a.a.getAxis(axisA);
        var firstLineSlopeY: number = a.b.getAxis(axisB) - a.a.getAxis(axisB);
        var secondLineSlopeX: number = b.b.getAxis(axisA) - b.a.getAxis(axisA);
        var secondLineSlopeY: number = b.b.getAxis(axisB) - b.a.getAxis(axisB);

        var tmp: number = -secondLineSlopeX * firstLineSlopeY + firstLineSlopeX * secondLineSlopeY;
        var s: number = (-firstLineSlopeY * (a.a.getAxis(axisA) - b.a.getAxis(axisA)) + firstLineSlopeX * (a.a.getAxis(axisB) - b.a.getAxis(axisB))) / tmp;
        var t: number = (secondLineSlopeX * (a.a.getAxis(axisB) - b.a.getAxis(axisB)) - secondLineSlopeY * (a.a.getAxis(axisA) - b.a.getAxis(axisA))) / tmp;

        if (s >= 0 && s <= 1 && t >= 0 && t <= 1) {
            intersectionPoint.setAxis(axisA, a.a.getAxis(axisA) + (t * firstLineSlopeX));
            intersectionPoint.setAxis(axisB, a.a.getAxis(axisB) + (t * firstLineSlopeY));

            return true;
        }

        return false;
    }

    /**
     * Deep clones the line.
     * @returns {Line}
     */
    public clone(): Line {
        return new Line(this.a.clone(), this.b.clone())
    }
}