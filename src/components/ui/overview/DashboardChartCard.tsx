
import { LineChart, LineChartEventProps } from '@/components/LineChart';
import { useState } from 'react';
import { Card } from '@tremor/react';

const chartdata = [
  {
    date: 'Jan 23',
    'pampers': 45,
    'molfix': 78,
  },
  {
    date: 'Feb 23',
    'pampers': 5,
    'molfix': 8,
  }
];

export default function LineChartUsageExampleWithClickEvent() {
  const [value, setValue] = useState<LineChartEventProps>(null);
  return (
    <>
      <h3 className="text-lg font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong">Closed Pull Requests</h3>
      <LineChart
        className="mt-4 h-72"
        data={chartdata}
        index="date"
        categories={['pampers', 'molfix']}
        colors={['blue', 'violet']}
        yAxisWidth={30}
        onValueChange={(v) => setValue(v)}
        connectNulls={true}
      />
    </>
  );
}