/**
 * Uses the Cohen Sutherland algorithm for clipping lines with the sceen bounds.
 *
 * @author Guido Krömer <mail 64 cacodaemon 46 de>
 */
class LineClipping {
    private static INSIDE: number = 0;
    private static LEFT: number = 1;
    private static RIGHT: number = 2;
    private static BOTTOM: number = 4;
    private static TOP: number = 8;


    constructor(public screen: GameScreen) {
    }

    /**
     * Clips the line.
     *
     * @param line The line to clip.
     * @return {boolean} True if the give line was clipped.
     */
    public clipLine(line: Line): boolean {
        return this.clip(line.a, line.b)
    }

    /**
     * Clips the line.
     *
     * @param a The line's start point.
     * @param b The line's end point.
     * @return {boolean} True if the give line was clipped.
     */
    public clip(a: Vector3, b: Vector3): boolean { //http://en.wikipedia.org/wiki/Cohen%E2%80%93Sutherland_algorithm
        var areaCodeA: number = this.areaCode(a);
        var areaCodeB: number = this.areaCode(b);

        while (true) {
            if (!(areaCodeA | areaCodeB)) {
                return true;
            }

            if (areaCodeA & areaCodeB) {
                return false;
            }

            var tempPoint: Vector3 = new Vector3();
            var tempAreaCode: number = areaCodeA ? areaCodeA : areaCodeB;

            if (tempAreaCode & LineClipping.TOP) {
                tempPoint.x = a.x + (b.x - a.x) * (this.screen.height - a.y) / (b.y - a.y);
                tempPoint.y = this.screen.height;
            } else if (tempAreaCode & LineClipping.BOTTOM) {
                tempPoint.x = a.x + (b.x - a.x) * (0.0 - a.y) / (b.y - a.y);
                tempPoint.y = 0.0;
            } else if (tempAreaCode & LineClipping.RIGHT) {
                tempPoint.y = a.y + (b.y - a.y) * (this.screen.width - a.x) / (b.x - a.x);
                tempPoint.x = this.screen.width;
            } else if (tempAreaCode & LineClipping.LEFT) {
                tempPoint.y = a.y + (b.y - a.y) * (0.0 - a.x) / (b.x - a.x);
                tempPoint.x = 0.0;
            }

            if (tempAreaCode == areaCodeA) {
                a.x = tempPoint.x;
                a.y = tempPoint.y;
                areaCodeA = this.areaCode(a);
            } else {
                b.x = tempPoint.x;
                b.y = tempPoint.y;
                areaCodeB = this.areaCode(b);
            }
        }
    }

    /**
     * Returns the area code determining which part of the screen has to be clipped.
     *
     * @param p The point to check.
     * @return {number} The area code.
     */
    private areaCode(p: Vector3): number {
        var code = LineClipping.INSIDE;

        if (p.x < 0) {
            code |= LineClipping.LEFT;
        } else if (p.x > this.screen.width) {
            code |= LineClipping.RIGHT;
        }

        if (p.y < 0) {
            code |= LineClipping.BOTTOM;
        } else if (p.y > this.screen.height) {
            code |= LineClipping.TOP;
        }

        return code;
    }
}