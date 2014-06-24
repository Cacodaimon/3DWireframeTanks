/**
 * A battle zone like tank mesh.
 *
 * @author Guido Krömer <mail 64 cacodaemon 46 de>
 */
class Tank extends Mesh {
    constructor() {
        super([
            new Vector3( -.8, -.5, .5),
            new Vector3( -.8,  .5, .5),
            new Vector3(  .7,  .5, .5),
            new Vector3(  .7, -.5, .5),

            new Vector3( -1.0, -.5, .2),
            new Vector3( -1.0,  .5, .2),
            new Vector3(  1.0,  .5, .2),
            new Vector3(  1.0, -.5, .2),

            new Vector3( -.6, -.4, -.1),
            new Vector3( -.6,  .4, -.1),
            new Vector3(  .1,  .4, -.1),
            new Vector3(  .1, -.4, -.1),

            new Vector3( -.4, -.25, -.5),
            new Vector3( -.4,  .25, -.5),

            new Vector3( -.1, -.1, -.27),
            new Vector3( -.1,  .1, -.27),
            new Vector3( 1.0,  .1, -.27),
            new Vector3( 1.0, -.1, -.27),

            new Vector3( -.24, .0, -.37),
            new Vector3(  1.0, .0, -.37)
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
            [3, 7],

            [ 8, 9],
            [ 9,10],
            [10,11],
            [11, 8],

            [ 4,  8],
            [ 5,  9],
            [ 6, 10],
            [ 7, 11],

            [12, 13],

            [ 8, 12],
            [11, 12],
            [ 9, 13],
            [10, 13],

            [14, 15],
            [15, 16],
            [16, 17],
            [17, 14],

            [18, 19],

            [16, 19],
            [17, 19],

            [14, 18],
            [15, 18]
        ]);

        for (var i: number = 0; i < this.vertices.length; i++) {
            this.vertices[i].z += .5;
        }
    }
}