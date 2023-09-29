import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import axios from 'axios';

const LineChart = ({ data }) => {
  const svgRef = useRef(null);
  const tooltipRef = useRef(null);



  useEffect(() => {
    const fetchData = async () => {
      try {

        // const data = response.data;

        if (data.s === "ok") {
          const parsedData = data.t.map((time, index) => ({
            date: new Date(time * 1000),
            value: data.c[index]
          }));

          const svg = d3.select(svgRef.current);
          const width = +svg.attr('width');
          const height = +svg.attr('height');

          const xScale = d3.scaleTime()
            .domain(d3.extent(parsedData, d => d.date))
            .range([0, width]);

          const yScale = d3.scaleLinear()
            .domain([d3.min(parsedData, d => d.value), d3.max(parsedData, d => d.value)])
            .range([height, 0]);

          const lineGenerator = d3.line()
            .x(d => xScale(d.date))
            .y(d => yScale(d.value));

          svg.append('path')
            .datum(parsedData)
            .attr('fill', 'none')
            .attr('stroke', 'steelblue')
            .attr('stroke-width', 1.5)
            .attr('d', lineGenerator);

          // Define the tooltip div
          const tooltip = d3.select(tooltipRef.current)
            .style("opacity", 0);

          // Add a circle to highlight the data point
          const focus = svg.append("circle")
            .attr("r", 5)
            .attr("fill", "red")
            .style("opacity", 0);

          // Add mouse event listeners to the SVG
          svg.on("mouseover", () => {
            focus.style("opacity", 1);
            tooltip.style("opacity", 1);
          })
          .on("mousemove", (event) => {
            const bisect = d3.bisector(d => d.date).left;
            const x0 = xScale.invert(d3.pointer(event)[0]);
            const i = bisect(parsedData, x0, 1);
            const d0 = parsedData[i - 1];
            const d1 = parsedData[i];
            const d = x0 - d0.date > d1.date - x0 ? d1 : d0;

            focus.attr("cx", xScale(d.date))
                 .attr("cy", yScale(d.value));

            tooltip.style("left", (d3.pointer(event)[0] + 30) + "px")
                   .style("top", (d3.pointer(event)[1]) + "px")
                   .html(`Date: ${d.date.toLocaleDateString()}<br>Value: ${d.value}`);
          })
          .on("mouseout", () => {
            focus.style("opacity", 0);
            tooltip.style("opacity", 0);
          });
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [data]);

  return (
    <div style={{position: "relative"}}>
      <svg ref={svgRef} width="600" height="400"></svg>
      <div ref={tooltipRef} className="tooltip" style={{
        position: "absolute",
        backgroundColor: "white",
        padding: "5px",
        borderRadius: "5px",
        pointerEvents: "none",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)"
      }}></div>
    </div>
  );
};

export default LineChart;
