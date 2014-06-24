/**
 * A merged mesh contains a horizon and a crater.
 *
 * @author Guido Krömer <mail 64 cacodaemon 46 de>
 */
class Terrain extends Mesh {
    constructor(steps: number = 50) {
        var crater: Mesh  = new Crater(steps);
        var horizon: Mesh = new Circle(steps);

        Mesh.merge(crater, horizon);

        super(crater.vertices, crater.lines);
    }
}