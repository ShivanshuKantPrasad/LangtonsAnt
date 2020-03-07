let play = document.querySelector('#play');

let settingMenu;

function widthChanged() {
    settingMenu.setRangeParameters("Cols", 10, settingMenu.getValue("Width") / 5, 2);
}

function heightChanged() {
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
    settings.rule = settingMenu.getValue("Rule");
    canvas.height = settings.height;
    canvas.width = settings.width;
    grid = new Grid(settings);
}

settingMenu = QuickSettings.create( 0, 0, "Settings")
    .addRange("Width", 100, 10000, window.innerWidth, 10, widthChanged)
    .addRange('Height', 100, 10000, window.innerHeight, 10, heightChanged)
    .addRange("Rows", 10, window.innerHeight / 5, 80, 2, rowChanged)
    .addRange("Cols", 10, window.innerWidth / 5, 100, 2, colsChanged)
    .addText('Rule', 'RL', rulesChanged)
    .addButton("Reset", reset);



settingMenu.addElement("", play);

play.addEventListener('click', () => {
    isRunning = !isRunning;
    play.setAttribute("value", isRunning ? 'Pause' : 'Play');
});
