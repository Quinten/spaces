import {Vertex} from './Vertex.js';

export function Quad() {

    return {
        a: Vertex(),
        b: Vertex(),
        c: Vertex(),
        d: Vertex()
    };
}
