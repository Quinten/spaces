window.onload = function () {

    console.log('window load');

    fetch('./data/building.json')
    .then(resp => resp.json())
    .then(buildingJson => {
        console.log(buildingJson);
    });

    var invert = !(Math.random() > .5);
    var bgColor = (invert) ? "hsl(" + Math.floor(Math.random() * 360) + ", 5%, 85%)" : "hsl(" + Math.floor(Math.random() * 360) + ", 45%, 30%)";
    var strokeColor = (!invert) ? "hsl(" + Math.floor(Math.random() * 360) + ", 5%, 85%)" : "hsl(" + Math.floor(Math.random() * 360) + ", 45%, 30%)";

    var engine = new DK.Engine();
    engine.viewport.fillPage();
    engine.viewport.setBackgroundcolor(bgColor);

    var _frameSize = 32;
    var _gridX = 6;
    var _gridY = 18;
    var _depthX = 12;
    var _depthZ = 8;

    function createFrame(x, y, frameSize) {
        var mesh = new DK.Mesh(x * frameSize, y * frameSize, 0);
        mesh.strokeColor = strokeColor;
        mesh.strokeWidth = 2;

        mesh.addVertex(-frameSize/2, -frameSize/2, 0);
        mesh.addVertex(frameSize/2, -frameSize/2, 0).addEdge();
        mesh.addVertex(frameSize/2, frameSize/2, 0).addEdge();
        mesh.addVertex(-frameSize/2, frameSize/2, 0).addEdge();
        mesh.addEdge(mesh.vertices[3], mesh.vertices[0]);

        mesh.addFace(mesh.vertices[0], mesh.vertices[1], mesh.vertices[3], strokeColor);
        mesh.addFace(mesh.vertices[3], mesh.vertices[1], mesh.vertices[0], strokeColor);
        mesh.addFace(mesh.vertices[2], mesh.vertices[3], mesh.vertices[1], strokeColor);
        mesh.addFace(mesh.vertices[1], mesh.vertices[3], mesh.vertices[2], strokeColor);

        return mesh;
    }

    function createFacade(x, z, gridX, gridY) {
        var facade = new DK.Container(x, 0, z);
        for (var x = 0; x < gridX; x++) {
            for (var y = 0; y < gridY; y++) {
                if (y > 4 && Math.random() > .8) {
                    break;
                }
                facade.addChild(createFrame(x - (gridX / 2), (gridY / 2) - y, _frameSize));
            }
        }
        return facade;
    }

    function createBuilding(x, z) {
        var building = new DK.Container(x * _frameSize * _gridX, 0, z * _frameSize * _gridX);
        building.addChild(createFacade(0, (_gridX - 1) / 2 * _frameSize, _gridX, _gridY));
        building.addChild(createFacade(0, - ((_gridX + 1) / 2 * _frameSize), _gridX, _gridY));
        building.addChild(createFacade((_gridX - 1) / 2 * _frameSize, 0, _gridX, _gridY).rotateY(90));
        building.addChild(createFacade(- ((_gridX + 1) / 2 * _frameSize), 0, _gridX, _gridY).rotateY(90));
        return building;
    }

    engine.scene.addChild(createBuilding(0, 12));

    engine.renderer.render();
}
