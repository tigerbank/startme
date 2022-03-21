import React, { useRef, useEffect, useState } from 'react';
import { select } from 'd3';

function D3() {
  const svgRef: any = useRef();

  const [data, setData] = useState<any>([25, 30, 45, 60, 20]);

  useEffect(() => {
    const svg = select(svgRef.current);
    svg
      .selectAll('circle')
      .data(data)
      .join(
        (enter) => enter.append('circle').attr('class', 'new'),
        (update) => update.attr('class', 'updated'),
      )
      .attr('r', (value: any) => value)
      .attr('cx', (value: any) => value * 2)
      .attr('cy', (value: any) => value * 2)
      .attr('stroke', 'red');
  }, [data]);

  return (
    <div>
      <svg ref={svgRef}></svg>
      <button onClick={() => setData(data.map((value: any) => value + 5))}>
        Update data
      </button>
      <button onClick={() => setData(data.filter((value: any) => value < 35))}>
        Update data
      </button>
    </div>
  );
}

export default D3;
