import {Vertex} from './Vertex.js';

export function Quad({
    a = {x: -1, y: -1, z: 0},
    b = {x: -1, y:  1, z: 0},
    c = {x:  1, y:  1, z: 0},
    d = {x:  1, y: -1, z: 0},
    color = '#00ff00'
}) {

    // direction of vertices (counter-clockwise)
    // a--d
    // |  |
    // b––c

    return {
        a: Vertex(a),
        b: Vertex(b),
        c: Vertex(c),
        d: Vertex(d),
        color: color,
        dWeight: 0,
        isBackface: function () {
            // calculate it from the bottom left triangle
            let cax = this.c.px - this.a.px,
                cay = this.c.py - this.a.py,
                bcx = this.b.px - this.c.px,
                bcy = this.b.py - this.c.py;
            return (cax * bcy > cay * bcx);
        },
        isBehindCamera: function () {
            return (this.a.pz < 0 || this.b.pz < 0 || this.c.pz < 0 || this.d.pz < 0);
        },
        getDepth: function () {
            return Math.min(this.a.d - this.dWeight, this.b.d - this.dWeight, this.c.d - this.dWeight, this.d.d - this.dWeight);
        }
    };
}

export function quadSort(a, b) {
    return (b.getDepth() - a.getDepth());
}
