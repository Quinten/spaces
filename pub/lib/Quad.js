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

    let quad = {
        a: Vertex(a),
        b: Vertex(b),
        c: Vertex(c),
        d: Vertex(d),
        w: 0,
        vertices: [],
        color: color,
        dWeight: 0,
        isFrontface: function () {
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
        },
        draw: function (context) {
            context.save();
            context.globalCompositeOperation = 'destination-atop';
            if (this.isFrontface() && !this.isBehindCamera()) {
                context.beginPath();
                context.moveTo(this.a.px, this.a.py);
                context.lineTo(this.b.px, this.b.py);
                context.lineTo(this.c.px, this.c.py);
                context.lineTo(this.d.px, this.d.py);
                context.lineTo(this.a.px, this.a.py);
                context.closePath();
                context.fillStyle = this.color;
                context.fill();
            }
            context.restore();
        }
    };

    quad.vertices = [quad.a, quad.b, quad.c, quad.d];

    return quad;
}

export function quadSort(a, b) {
    return (b.getDepth() - a.getDepth());
}
