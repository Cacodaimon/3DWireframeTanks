/**
 * A simple camera.
 *
 * @author Guido Krömer <mail 64 cacodaemon 46 de>
 */
class Camera {

    /**
     * Currently not used.
     */
    //private view: Matrix4;

    /**
     * The camera position.
     */
    private position: Vector3;

    /**
     * The look at point.
     */
    private lookAt: Vector3;

    /**
     * The camera/view matrix.
     */
    private camera: Matrix4;

    /**
     * The camera near clipping plane, used for cutting lines which are only partially in front of the camera.
     */
    public nearClippingPlane: Plane;

    /**
     * Creates a new camera.
     *
     * @param position
     * @param lookAt
     * @param near
     * @param far
     * @param fov
     */
    constructor(position: Vector3 = new Vector3(), lookAt: Vector3 = new Vector3(1.0, 1.0, 1.0), near: number = 0.01, far: number = 1.0, fov: number = 1.04719755) {
        this.setPositionAndLookAt(position, lookAt);
        this.nearClippingPlane = new Plane(1.0, new Vector3(0.0, 0.0, 1.0));
        //this.view = Matrix4.perspective(near, far, fov);
    }

    /**
     * Update the camera matrix after the position or look at has been modified.
     */
    public updateCameraMatrix(): void {
        this.camera = Matrix4.lookAt(this.position, this.lookAt, new Vector3(0.0, 0.0, 1.0));
    }

    /**
     * Gets the camera/view matrix.
     *
     * @return {Matrix4}
     */
    public getCameraMatrix(): Matrix4 {
        return this.camera;
    }

    /**
     * Sets the camera position and updates the camera/view matrix.
     *
     * @param position The new camera position.
     */
    public setPosition(position: Vector3): void {
        this.position = position;
        this.updateCameraMatrix();
    }

    /**
     * Gets the camera position.
     *
     * @return {Vector3} The current camera position.
     */
    public getPostition(): Vector3 {
        return this.position;
    }

    /**
     * Sets the look at point and updates the camera matrix.
     *
     * @param lookAt The new look at point.
     */
    public setLookAt(lookAt: Vector3): void {
        this.lookAt = lookAt;
        this.updateCameraMatrix();
    }

    /**
     * Gets the look at point.
     *
     * @return {Vector3} The current look at point.
     */
    public getLookAt(): Vector3 {
        return this.lookAt;
    }

    /**
     * Sets camera position, the look at point and updates the camera matrix.
     *
     * @param position The new camera position.
     * @param lookAt The new look at point.
     */
    public setPositionAndLookAt(position: Vector3, lookAt: Vector3): void {
        this.lookAt = lookAt;
        this.position = position;
        this.updateCameraMatrix();
    }
 }