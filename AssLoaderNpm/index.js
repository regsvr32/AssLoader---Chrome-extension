//https://arnavion.github.io/libjass/api.xhtml
const libjass = require("libjass");
require("libjass/libjass.css");
require("./ass-warpper.css");

function createFileInput() {
    let _input = document.body.appendChild(document.createElement("input"));
    _input.id = "ass-loader-file";
    _input.setAttribute("type", "file");
    _input.setAttribute("style", "display: none;");
    _input.setAttribute("accept", ".ass");
    _input.onchange = _event => {
        let files = _event.target.files;
        if (files.length) {
            let reader = new FileReader();
            reader.onload = StartRender;
            reader.readAsText(files[0]);
        }
    }
    return _input;
}

(() => {
    let selectFileInput = document.querySelector("#ass-loader-file") || createFileInput();
    selectFileInput.click();
})();

async function StartRender(event) {
    let assText = event.target.result;
    let ass = await libjass.ASS.fromString(assText);
    let { WebRenderer, VideoClock, RendererSettings } = libjass.renderers;
    let video = [...document.querySelectorAll("video")].find(v => v.style.visibility != "hidden");
    if (!video) { return; }
    let wrapper = video.parentElement.appendChild(document.createElement("div"));
    wrapper.className = "ass-warpper";
    let renderer = new WebRenderer(ass, new VideoClock(video), wrapper, new RendererSettings());
    let resize = () => renderer.resize(video.clientWidth, video.clientHeight, video.clientLeft, video.clientTop);
    video.onresize = resize;
    resize();
}