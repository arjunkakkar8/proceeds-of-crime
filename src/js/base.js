import { width, height } from "./index";

const $svg = d3.select("#graphic-container");
const padding = { top: 10, bottom: 10, left: 50, right: 10 },
  startDate = 1980,
  endDate = 2020;
const domMult = 0.15,
  intMult = 0.85;
let yearLine, domLine, intLine;

function setupBase() {
  const baseGroup = $svg.select("#base-group");
  const yearGroup = baseGroup.append("g").attr("id", "year-group");
  for (let i = startDate; i <= endDate; i++) {
    if (i % 10 == 0) {
      yearGroup
        .append("text")
        .text(i)
        .attr("id", `year-marker-${i}`)
        .attr("class", "year-marker-text")
        .attr("alignment-baseline", "middle")
        .attr("text-anchor", "middle");
    } else {
      yearGroup
        .append("line")
        .attr("id", `year-marker-${i}`)
        .attr("class", "year-marker-dash");
    }
  }
  domLine = baseGroup.append("line").attr("id", "domLine");
  intLine = baseGroup.append("line").attr("id", "intLine");
}

function resizeBase() {
  for (let i = startDate; i <= endDate; i++) {
    const el = d3.select(`#year-marker-${i}`);
    if (i % 10 == 0) {
      el.attr("x", padding.left).attr(
        "y",
        padding.top + (height * (i - startDate)) / (endDate - startDate)
      );
    } else {
      el.attr("x1", i % 5 == 0 ? padding.left - 10 : padding.left - 5)
        .attr("x2", i % 5 == 0 ? padding.left + 10 : padding.left + 5)
        .attr(
          "y1",
          padding.top + (height * (i - startDate)) / (endDate - startDate)
        )
        .attr(
          "y2",
          padding.top + (height * (i - startDate)) / (endDate - startDate)
        );
    }
  }
  domLine
    .attr("x1", padding.left + domMult * width)
    .attr("x2", padding.left + domMult * width)
    .attr("y1", padding.top)
    .attr("y2", padding.top + height);

  intLine
    .attr("x1", padding.left + intMult * width)
    .attr("x2", padding.left + intMult * width)
    .attr("y1", padding.top)
    .attr("y2", padding.top + height);
}

export { setupBase, resizeBase, domMult, intMult, startDate, endDate, padding };
