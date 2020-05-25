import { setupBase, resizeBase, padding } from "./base";
import { setupCircles, resizeCircles } from "./circles";

const $svg = d3.select("#graphic-container");
let width, height;

function init() {
  setupBase();
  setupCircles();
}

function resize() {
  width = window.innerWidth - padding.left - padding.right;
  height = window.innerHeight - padding.top - padding.bottom;
  $svg.attr("viewBox", `0 0 ${window.innerWidth} ${window.innerHeight}`);
  resizeBase();
  resizeCircles();
}

init();
resize();

window.addEventListener("resize", resize);

export { width, height };
