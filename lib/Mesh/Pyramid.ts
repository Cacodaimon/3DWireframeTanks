/**
 * A pyramid mesh.
 *
 * @author Guido Krömer <mail 64 cacodaemon 46 de>
 */
class Pyramid extends Mesh {
    constructor() {
        super([
            new Vector3(-1.0,-1.0, 1.0),
            new Vector3(-1.0, 1.0, 1.0),
            new Vector3( 1.0, 1.0, 1.0),
            new Vector3( 1.0,-1.0, 1.0),
            new Vector3( 0.0, 0.0,-1.0),
        ], [
            [0, 1],
            [1, 2],
            [2, 3],
            [3, 0],

            [0, 4],
            [1, 4],
            [2, 4],
            [3, 4]
        ]);
    }
}