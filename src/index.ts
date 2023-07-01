//
// Simple bootstrap 
//

import { Game } from "./Game";
import { initCodeEditor } from "./mods/Editor";

console.log("██    ██ ███    ██ ███████  █████  ██████  ████████ ██   ██ ███████ ██████  ");
console.log("██    ██ ████   ██ ██      ██   ██ ██   ██    ██    ██   ██ ██      ██   ██ ");
console.log("██    ██ ██ ██  ██ █████   ███████ ██████     ██    ███████ █████   ██   ██ ");
console.log("██    ██ ██  ██ ██ ██      ██   ██ ██   ██    ██    ██   ██ ██      ██   ██ ");
console.log(" ██████  ██   ████ ███████ ██   ██ ██   ██    ██    ██   ██ ███████ ██████ ");

console.log("");
console.log("Version _VERSION_")
console.log("");

initCodeEditor();

const game = new Game();
game.startLoop();

const urlParams = new URLSearchParams(window.location.search);
const portal = urlParams.get('portal');
if (portal) {
    game.ui.joinAsClient();
    document.getElementById("connect")!.style.display = "none";
}
