export function Camera(x = 0, y = 0, z = -650) {

    return {
        // camera position
        x: x,
        y: y,
        z: z,
        // camera rotation
        rotationX: 0,
        rotationY: 0,
        rotationZ: 0,
        // focal point in 3d coords (viewers position relative to the display surface)
        ex: 0,
        ey: 0,
        ez: 650,
        // camera animation function
        step: undefined
    };
}
