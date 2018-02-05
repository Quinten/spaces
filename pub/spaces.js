import {Engine} from './lib/Engine.js';
import {Quad} from './lib/Quad.js';

window.onload = () => {

    fetch('./data/building.json')
    .then(resp => resp.json())
    .then(buildingJson => {

        let engine = window.engine = Engine();

        engine.scene = buildingJson.doors.map( door => Quad(door) );

        let waypoints = buildingJson.waypoints;
        let w = 0;
        let from = waypoints[w];
        w = 1;
        let to = waypoints[w];
        let angle = Math.atan2(to.x - from.x, to.z - from.z) * 180 / Math.PI;

        console.log(angle);

        engine.camera.x = from.x;
        engine.camera.z = from.z;
        engine.camera.rotationY = angle;

        engine.camera.step = function () {
            engine.camera.x += (to.x - from.x) / 240;
            engine.camera.z += (to.z - from.z) / 240;
            engine.camera.rotationY += (angle - engine.camera.rotationY) / 6;
            if (Math.abs(to.x - engine.camera.x) < .1 && Math.abs(to.z - engine.camera.z) < .1) {
                w++;
                if (w >= waypoints.length) {
                    w = 0;
                }
                from = to;
                to = waypoints[w];
                angle = Math.atan2(to.x - from.x, to.z - from.z) * 180 / Math.PI;
                console.log(angle);
            }
        };

        engine.start();

    });

}