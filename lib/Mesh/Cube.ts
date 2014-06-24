/**
 * A cube mesh.
 *
 * @author Guido Krömer <mail 64 cacodaemon 46 de>
 */
class Cube extends Mesh {
    constructor() {
        super([
            new Vector3(-1.0,-1.0, 1.0),
            new Vector3(-1.0, 1.0, 1.0),
            new Vector3( 1.0, 1.0, 1.0),
            new Vector3( 1.0,-1.0, 1.0),
            new Vector3(-1.0,-1.0,-1.0),
            new Vector3(-1.0, 1.0,-1.0),
            new Vector3( 1.0, 1.0,-1.0),
            new Vector3( 1.0,-1.0,-1.0)
        ], [
            [0, 1],
            [1, 2],
            [2, 3],
            [3, 0],

            [4, 5],
            [5, 6],
            [6, 7],
            [7, 4],

            [0, 4],
            [1, 5],
            [2, 6],
            [3, 7]
        ]);
    }
}