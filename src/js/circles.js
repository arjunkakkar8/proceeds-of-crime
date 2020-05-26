import { width, height } from "./index";
import { domMult, intMult, startDate, endDate, padding } from "./base";

const $svg = d3.select("#graphic-container");
const circles = $svg.selectAll("circle");
const radius = 10;

const $hoverBox = d3.select("#graphic-hover");
const $mainBoxes = d3.selectAll(".main-text");

function setupCircles() {
  circles.nodes().forEach((el, i) => {
    const data = el.dataset;
    const id = createId(data);
    d3.select(el)
      .attr("id", id)
      .on("mouseenter", () => highlight(data.influence, id, data.hover))
      .on("mouseleave", clearHighlight)
      .on("click", () => clickHandler(data.influence, id));
  });
}

function resizeCircles() {
  circles.nodes().forEach((el, i) => {
    const data = el.dataset;
    const xMult = data.type === "international" ? intMult : domMult;
    const xPos = padding.left + width * xMult;
    const yPos = padding.top + height * getYFrac(data.date);
    d3.select(el).attr("r", radius).attr("cx", xPos).attr("cy", yPos);
  });
}

function createId(data) {
  const date = data.date;
  const type = data.type;
  return type.slice(0, 1) + date.replace(/\//gi, "");
}

function getYFrac(date) {
  let frac = 0;
  const comps = date.split("/");
  frac +=
    (Number(comps[2]) +
      Number(comps[1]) / 12 +
      Number(comps[0]) / 365 -
      startDate) /
    (endDate - startDate);
  return frac;
}

function highlight(inf, self, hover) {
  if (inf.trim() != "") {
    const influences = inf.split(",");
    influences.forEach((id) =>
      d3
        .select(`#${id.trim()}`)
        .transition()
        .attr("r", radius * 1.4)
        .attr("fill", "orange")
    );
  }

  d3.select(`#${self}`)
    .transition()
    .attr("r", radius * 1.4)
    .attr("fill", "yellow");

  const pos = d3.select(`#${self}`).node().getBoundingClientRect();

  $hoverBox
    .classed("visible", true)
    .classed("right", self.slice(0, 1) === "d")
    .style("left", `${pos.x + pos.width / 2}px`)
    .style("top", `${pos.y + pos.height / 2}px`)
    .html(hover);
}

function clearHighlight() {
  circles.nodes().forEach((el, i) => {
    d3.select(el).transition().attr("r", radius).attr("fill", "black");
  });

  $hoverBox.classed("visible", false);
}

function clickHandler(inf, self) {
  $mainBoxes.classed("visible", false);

  const influences = inf.split(",");
  [...influences, self].forEach((id, i) => {
    const data = d3.select(`#${id.trim()}`).node().dataset;
    d3.select(`#graphic-main-${i}`).classed("visible", true).html(data.main);
    console.log([id, i]);
  });
}

export { setupCircles, resizeCircles };
