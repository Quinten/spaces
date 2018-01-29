import {vertex} from './vertex.js';

export function quad() {

    console.log(vertex());

    return {
        a: vertex(),
        b: vertex(),
        c: vertex(),
        d: vertex()
    };
}
