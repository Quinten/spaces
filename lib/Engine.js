import {Viewport} from './Viewport.js';
import {Camera} from './Camera.js';
import {Renderer} from './Renderer.js';

export function Engine() {

    let engine = {
        viewport: Viewport(),
        camera: Camera(),
        scene: [], // for the moment an array of quads
        renderer: Renderer(),
        start: function () {

            if (!this.renderer) {
                return;
            }

            let onF = () => {
                window.requestAnimationFrame(onF, this.viewport.canvas);
                this.viewport.context.clearRect(0, 0, this.viewport.canvas.width, this.viewport.canvas.height);
                this.renderer.render(this.viewport, this.scene, this.camera);
            }
            onF();

        },
        step: function (obj) {
            console.log('step');
        }
    };

    return engine;
}
