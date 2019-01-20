let play = document.querySelector('#play');

let settingMenu;

function widthChanged() {
    settingMenu.setRangeParameters("Cols", 10, settingMenu.getValue("Width") / 5, 2);
}

function heightChaged() {
    settingMenu.setRangeParameters("Rows", 10, settingMenu.getValue("Height") / 5, 2);
}

function colsChanged() {

}

function rowChanged() {

}

function rulesChanged() {

}

function reset() {
    isRunning = false;
    settings.width = settingMenu.getValue("Width");
    settings.height = settingMenu.getValue("Height");
    settings.rows = settingMenu.getValue("Rows");
    settings.cols = settingMenu.getValue("Cols");
    canvas.height = settings.height;
    canvas.width = settings.width;
    grid = new Grid(settings);
}

settingMenu = QuickSettings.create( 0, 0, "Settings")
    .addRange("Width", 100, 10000, window.innerWidth, 10, widthChanged)
    .addRange('Height', 100, 10000, window.innerHeight, 10, heightChaged)
    .addRange("Rows", 10, window.innerHeight / 5, 20, 2, rowChanged)
    .addRange("Cols", 10, window.innerWidth / 5, 30, 2, colsChanged)
    .addRange("Rules", 2, 20, 2, 1, rulesChanged)
    .addButton("Reset", reset);



settingMenu.addElement("", play);

play.addEventListener('click', () => {
    isRunning = !isRunning;
    play.setAttribute("value", isRunning ? 'Pause' : 'Play');
});