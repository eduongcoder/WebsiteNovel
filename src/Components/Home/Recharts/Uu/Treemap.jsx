import React from 'react';
import { Treemap } from 'recharts';

const data = [
  { name: 'A1', size: 100 },
  { name: 'A2', size: 130 },
  { name: 'B1', size: 300 },
  { name: 'B2', size: 100 },
];
//Biểu đồ cây
function MyTreemap() {
  return (
    <Treemap width={400} height={200} data={data} dataKey="size" ratio={4 / 3} stroke="#fff" />
  );
}

export default MyTreemap;
