/**
 * Defines a 3D mesh build of lines.
 *
 * @author Guido Krömer <mail 64 cacodaemon 46 de>
 */
class Mesh {

    /**
     * The mesh vertices.
     */
    public vertices: Array<Vector3>;

    /**
     * The mesh lines, each line is an array containing the indexes of two vertices.
     */
    public lines: Array<Array<number>>;

    /**
     * The mesh radius.
     */
    public radius: number;

    /**
     * The mesh centroid, the centroid is the last vertex stored in vertices, too.
     */
    public centroid: Vector3;

    /**
     * Mesh constructor.
     *
     * @param {Array<Vector3>} vertices
     * @param {Array<Array<number>>} lines
     */
    constructor(vertices: Array<Vector3>, lines: Array<Array<number>>) {
        this.vertices = vertices;
        this.lines = lines;
        this.calculateCentroid();
        this.calculateRadius();
    }

    /**
     * Clones all vertices, including the centroid vertex.
     *
     * @returns {Array<Vector3>}
     */
    public cloneVertices(): Array<Vector3> {
        var clonedVertices: Array<Vector3> = [];

        var verticesCount: number = this.vertices.length;
        for (var i = 0; i < verticesCount; i++) {
            clonedVertices.push(this.vertices[i].clone());
        }

        return clonedVertices;
    }

    /**
     * Calculates the centroid vertex.
     * The centroid is sored in centroid and as the last vertex in vertices.
     */
    public calculateCentroid(): void {
        var min: Vector3 = new Vector3(Number.MAX_VALUE, Number.MAX_VALUE, Number.MAX_VALUE);
        var max: Vector3 = new Vector3(Number.MIN_VALUE, Number.MIN_VALUE, Number.MIN_VALUE);

        for (var i = this.vertices.length - 1; i >= 0; i--) {
            var vertex = this.vertices[i];

            min.x = Math.min(min.x, vertex.x);
            min.y = Math.min(min.y, vertex.z);
            min.z = Math.min(min.z, vertex.z);

            max.x = Math.max(max.x, vertex.x);
            max.y = Math.max(max.y, vertex.z);
            max.z = Math.max(max.z, vertex.z);
        }

        this.centroid = new Vector3(
            0.5 * (max.x + min.x),
            0.5 * (max.y + min.y),
            0.5 * (max.z + min.z)
        );

        this.vertices.push(this.centroid);
    }

    /**
     * Calculates the radius stored in radius.
     */
    public calculateRadius(): void {
        this.radius = Number.MIN_VALUE;
        for (var i = this.vertices.length - 1; i >= 0; i--) {
            this.radius = Math.max(this.radius, Vector3.mag(this.vertices[i]));
        }
    }

    /**
     * Merges the seconds mesh to the first mesh.
     *
     * @param a The first mesh.
     * @param b The second mesh.
     */
    public static merge(a: Mesh, b: Mesh): void {
        var vLength: number =  a.vertices.length - 1;

        a.vertices.pop(); //remove centroid
        for (var i = 0; i < b.vertices.length - 1; i++) {
            a.vertices.push(b.vertices[i]);
        }

        for (var i = 0; i < b.lines.length; i++) {
            var line: Array<number> = b.lines[i];
            line[0] += vLength;
            line[1] += vLength;

            a.lines.push(line);
        }
    }
}