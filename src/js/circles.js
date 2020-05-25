import { width, height } from "./index";
import { domMult, intMult, startDate, endDate, padding } from "./base";

const $svg = d3.select("#graphic-container");
const circles = $svg.selectAll("circle");

function setupCircles() {
  circles.nodes().forEach((el, i) => {
    const data = el.dataset;
    d3.select(el)
      .attr("id", createId(data))
      .on("mouseenter", highlight)
      .on("mouseleave", clearHighlight)
      .on("click", clickHandler);
  });
}

function resizeCircles() {
  circles.nodes().forEach((el, i) => {
    const data = el.dataset;
    const xMult = data.type === "international" ? intMult : domMult;
    const xPos = padding.left + width * xMult;
    const yPos = padding.top + height * getYFrac(data.date);
    console.log(data);
    d3.select(el).attr("r", 5).attr("cx", xPos).attr("cy", yPos);
    console.log([el, i]);
  });
}

function createId(data) {
  const date = data.date;
  const type = data.type;
  return date.replace(/\//gi, "") + type.slice(0, 1);
}

function getYFrac(date) {
  let frac = 0;
  const comps = date.split("/");
  frac +=
    (Number(comps[2]) +
      Number(comps[0]) / 12 +
      Number(comps[1]) / 365 -
      startDate) /
    (endDate - startDate);
  return frac;
}

function highlight() {}

function clearHighlight() {}

function clickHandler() {}

export { setupCircles, resizeCircles };
