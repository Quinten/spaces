import {Engine} from './lib/Engine.js';
import {Quad} from './lib/Quad.js';

window.onload = () => {

    fetch('./data/building.json')
    .then(resp => resp.json())
    .then(buildingJson => {

        let engine = window.engine = Engine();

        engine.scene = buildingJson.doors.map( door => {
            let quad = Quad(door);
            quad.step = function () {
                if (!this.isBehindCamera() && this.a.px < 0 && this.d.px > engine.viewport.canvas.width) {
                    engine.viewport.canvas.style.background = this.color;
                }
            };
            return quad;
        });

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
            //engine.camera.x += (to.x - from.x) / 240;
            //engine.camera.z += (to.z - from.z) / 240;
            engine.camera.rotationY += (angle - engine.camera.rotationY) / 30;
            engine.camera.x += Math.sin(engine.camera.rotationY * Math.PI / 180) / 120;
            engine.camera.z += Math.cos(engine.camera.rotationY * Math.PI / 180) / 120;
            if (Math.abs(to.x - engine.camera.x) < .25 && Math.abs(to.z - engine.camera.z) < .25) {
                w++;
                if (w >= waypoints.length) {
                    w = 0;
                }
                from = to;
                to = waypoints[w];
                let newAngle = Math.atan2(to.x - from.x, to.z - from.z) * 180 / Math.PI;
                if ((newAngle - angle) < -180) {
                    engine.camera.rotationY -= 360;
                }
                if ((newAngle - angle) > 180) {
                    engine.camera.rotationY += 360;
                }
                angle = newAngle;
            }
        };

        engine.start();

    });

}
