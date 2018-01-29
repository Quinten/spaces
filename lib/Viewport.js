export function Viewport(color = '#000000') {

    let canvas = document.createElement('canvas');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    canvas.style.background = color;
    document.body.appendChild(canvas);

    let viewport = {
        canvas: canvas,
        context: canvas.getContext('2d'),
        vpX: canvas.width / 2,
        vpY: canvas.height / 2
    };

    window.addEventListener('resize', (e) => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        viewport.vpX = canvas.width / 2;
        viewport.vpY = canvas.height / 2;
    });

    return viewport;
}
