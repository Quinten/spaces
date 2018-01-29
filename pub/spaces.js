import {Viewport} from './lib/Viewport.js';
import {Quad} from './lib/Quad.js';

window.onload = () => {

    let viewport = Viewport();

    console.log(Quad());

    /*
    var invert = !(Math.random() > .5);
    var bgColor = (invert) ? "hsl(" + Math.floor(Math.random() * 360) + ", 5%, 85%)" : "hsl(" + Math.floor(Math.random() * 360) + ", 45%, 30%)";
    var strokeColor = (!invert) ? "hsl(" + Math.floor(Math.random() * 360) + ", 5%, 85%)" : "hsl(" + Math.floor(Math.random() * 360) + ", 45%, 30%)";
    */

    /*

    var engine = new DK.Engine();
    engine.viewport.fillPage();
    engine.viewport.setBackgroundcolor(bgColor);

    window.addEventListener('resize', (e) => {
        engine.viewport.fillPage();
    });

    const gridSize = 32;
    const ceilingHeight = -4 * gridSize;

    function createWall({x, z, w, d}) {
        var mesh = new DK.Mesh(x * gridSize, 0, z * gridSize);

        mesh.addVertex(0, 0, 0);
        mesh.addVertex(w * gridSize, 0, d * gridSize);
        mesh.addVertex(w * gridSize, ceilingHeight, d * gridSize);
        mesh.addVertex(0, ceilingHeight, 0);

        //mesh.addFace(mesh.vertices[0], mesh.vertices[1], mesh.vertices[3], strokeColor);
        mesh.addFace(mesh.vertices[3], mesh.vertices[1], mesh.vertices[0], strokeColor);
        //mesh.addFace(mesh.vertices[2], mesh.vertices[3], mesh.vertices[1], strokeColor);
        mesh.addFace(mesh.vertices[1], mesh.vertices[3], mesh.vertices[2], strokeColor);

        return mesh;
    }

    function createBuilding(buildingData) {
        var building = new DK.Container(0, 0, 0);
        for (let roomData of buildingData.rooms) {
            for (let wallData of roomData.walls) {
                building.addChild(createWall(wallData));
            }
        }
        return building;
    }
    */

    fetch('./data/building.json')
    .then(resp => resp.json())
    .then(buildingJson => {
        console.log(buildingJson);
        /*
        engine.scene.addChild(createBuilding(buildingJson));
        engine.camera.x = 3.5 * gridSize;
        engine.camera.y = ceilingHeight / 4;
        engine.camera.z = 5.5 * gridSize;
        engine.camera.z = 2 * gridSize;
        engine.camera.z = -1;
        engine.start();
        */
    });

}
