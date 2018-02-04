import {Engine} from './lib/Engine.js';
import {Quad} from './lib/Quad.js';

window.onload = () => {

    fetch('./data/building.json')
    .then(resp => resp.json())
    .then(buildingJson => {

        let engine = window.engine = Engine();

        engine.scene = buildingJson.doors.map( door => Quad(door) );

        engine.camera.x = 2.5;
        engine.camera.z = 2.5;

        engine.start();

    });

}