let play = document.querySelector('#play');
let isRunning = false;

play.addEventListener('click', () => {
    isRunning = !isRunning;
    play.innerText = isRunning ? 'Pause' : 'Play';
})