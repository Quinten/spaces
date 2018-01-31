import {Viewport} from './Viewport.js';
import {Camera} from './Camera.js';

export function Engine() {

    let engine = {
        viewport: Viewport(),
        camera: Camera(),
        scene: [], // for the moment an array of quads
        start: function () {
            console.log('starting');

            let onF = () => {
                window.requestAnimationFrame(onF, this.viewport.canvas);
                this.viewport.context.clearRect(0, 0, this.viewport.canvas.width, this.viewport.canvas.height);
            }
            onF();
        },
        step: function (obj) {
            console.log('step');
        }
    };

    return engine;
}
