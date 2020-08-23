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
    rule: 'RL',
    delay: 200,
    colors: [
        '#00ff00',
        '#000000',
        '#ff0000',
        '#0000ff',
        '#ffffff',
        '#00ffff',
        '#ff00ff',
        '#ffff00'
    ]
};

grid = new Grid(settings);

function timestamp() {
    return window.performance && window.performance.now ? window.performance.now() : new Date().getTime();
}

let now,
    dt   = 0,
    last = timestamp(),
    step = settings.delay/1000;

function frame() {
    now = timestamp();
    dt = dt + Math.min(1, (now - last) / 1000);
    step = settings.delay/1000;
    while(dt > step) {
        // console.log(dt);
        dt = dt - step;
        if(isRunning) grid.step(dt);
    }
    grid.draw(ctx);
    last = now;
    requestAnimationFrame(frame);
}

requestAnimationFrame(frame);
