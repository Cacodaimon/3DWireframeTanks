/**
 * Simple cloneable interface.
 *
 * @author Guido Krömer <mail 64 cacodaemon 46 de>
 */
interface ICloneable<T> {

    /**
     * Clones the current object.
     */
    clone(): T;
}