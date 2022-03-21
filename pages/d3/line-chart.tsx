import React, { useRef, useEffect, useState } from 'react';
import { select, line, curveCardinal, axisBottom, scaleLinear } from 'd3';

function LineChart() {
  const [data, setData] = useState<any>([25, 30, 45, 60, 20, 90]);
  const svgRef: any = useRef();

  useEffect(() => {
    const svg = select(svgRef.current);

    const xScale: any = scaleLinear()
      .domain([0, data.length - 1])
      .range([0, 300]);

    const yScale: any = scaleLinear().domain([0, 150]).range([150, 0]);

    const xAxis: any = axisBottom(xScale);
    svg.select('.x-axis').call(xAxis);

    const myLine = line()
      .x((value: any, index: any) => xScale(index))
      .y(yScale)
      .curve(curveCardinal);

    svg
      .selectAll('path')
      .data([data])
      .join('path')
      .attr('d', (value) => myLine(value))
      .attr('fill', 'none')
      .attr('stroke', 'blue');
  }, [data]);

  return (
    <div>
      <svg ref={svgRef}>
        <path d="M0,150,100,100,150,120" stroke="blue" fill="none"></path>
        <g className="x-axis" />
      </svg>
      <button onClick={() => setData(data.map((value: any) => value + 5))}>
        Update data
      </button>
      <button onClick={() => setData(data.filter((value: any) => value < 35))}>
        Update data
      </button>
    </div>
  );
}

export default LineChart;
