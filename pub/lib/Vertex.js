export function Vertex({x = 0, y = 0, z = 0}) {

    return {
        x: x, // x in 3d
        y: y, // y in 3d
        z: z, // z in 3d
        px: 0, // x in 2d
        py: 0, // y in 2d
        pz: 0, // z on axis of camera
        d: 0 // distance to the camera
    };
}
