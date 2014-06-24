/**
 * A circle mesh.
 *
 * @author Guido Krömer <mail 64 cacodaemon 46 de>
 */
class Circle extends Mesh {
    constructor(steps: number = 10) {
        var step: number = Math.PI * 2 / steps;
        var vertices: Array<Vector3> = [];
        var translate: Vector3 = new Vector3(1, 0, 0);
        var centroid = new Vector3(0, 0, 0);

        for (var i: number = 0; i < steps; i++) {
            var rotation: Matrix4 = Matrix4.rotateX(step * i);
            vertices.push(Matrix4.transform(centroid, Matrix4.multiply(rotation, Matrix4.translate(translate))));
        }

        var lines: Array<Array<number>> = [];
        for (var i: number = 0; i < steps - 1; i++) {
            lines.push([i, i + 1]);
        }
        lines.push([0, steps - 1]);

        super(vertices, lines);
    }
}