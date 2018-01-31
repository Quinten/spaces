import {quadSort} from './Quad.js';

export function Renderer() {

    let rad = Math.PI / 180;

    let renderer = {
        render: function ( viewport, scene, camera ) {
            // projection
            // http://en.wikipedia.org/wiki/3D_projection
            let cosX = Math.cos(camera.rotationX * rad);
            let sinX = Math.sin(camera.rotationX * rad);
            let cosY = Math.cos(camera.rotationY * rad);
            let sinY = Math.sin(camera.rotationY * rad);
            let cosZ = Math.cos(camera.rotationZ * rad);
            let sinZ = Math.sin(camera.rotationZ * rad);
            for ( let mesh of scene ) {
                mesh.w = 0xffffff;
                for ( let vertex of mesh.vertices ) {
                    let oldX = vertex.x - camera.x;
                    let oldY = vertex.y - camera.y;
                    let oldZ = vertex.z - camera.z;
                    let partA = sinZ * oldY + cosZ * oldX;
                    let partB = cosY * oldZ + sinY * partA;
                    let partC = cosZ * oldY - sinZ * oldX;
                    let newX = cosY * partA - sinY * oldZ;
                    let newY = sinX * partB + cosX * partC;
                    let newZ = cosX * partB - sinX * partC;
                    vertex.px = viewport.vpX + (newX - camera.ex) * (camera.ez / newZ);
                    vertex.py = viewport.vpY + (newY - camera.ey) * (camera.ez / newZ);
                    vertex.pz = newZ;
                    // Euler distance for sorting
                    vertex.d = Math.sqrt(oldX * oldX + oldY * oldY + oldZ * oldZ);
                    mesh.w = Math.min(mesh.w, vertex.d);
                }
            }
            scene.sort(quadSort);
            for ( let mesh of scene ) {
                mesh.draw(viewport.context);
            }
        }
    };

    return renderer;
}
