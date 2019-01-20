let canvas = document.querySelector('#canvas');
let ctx = canvas.getContext("2d");

let height = window.innerHeight;
let width = window.innerWidth;

canvas.height = height;
canvas.width = width;

let grid;
let settings;

let isRunning = false;

settings = {
    rows: 80,
    cols: 100,
    height,
    width,
    rules: [
        {
            color: '#00ff04',
            rotation: 1
        },
        {
            color: '#000000',
            rotation: -1
        }
    ]
}

grid = new Grid(settings);

function timestamp() {
    return window.performance && window.performance.now ? window.performance.now() : new Date().getTime();
}

let now,
    dt   = 0,
    last = timestamp(),
    step = 1/100;

function frame() {
    now = timestamp();
    dt = dt + Math.min(1, (now - last) / 1000);
    while(dt > step) {
        dt = dt - step;
        if(isRunning) grid.step();
    }
    grid.draw(ctx);
    last = now;
    requestAnimationFrame(frame);
}

requestAnimationFrame(frame);