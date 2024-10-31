import { PieChart, Pie, Cell, Tooltip } from 'recharts';

const PieChartWithPaddingAngle = ({ percentFillvalue, colors }) => {
    const filledValue = (percentFillvalue / 100) * 360;
    const remainingValue = 360 - filledValue;
    const data = [
        { name: 'filled', value: remainingValue },
        { name: 'remaining', value: filledValue },
    ];

    const renderTooltiContent = (value) => {
        return `${(value / 350) * 100}%`;
    };

    return (
        <PieChart width={100} height={100}>
            <Pie
                data={data}
                cx={50}
                cy={45}
                innerRadius={20}
                outerRadius={40}
                fill="#ad1d4b"
                paddingAngle={0}
                dataKey="value"
                startAngle={-270}
                endAngle={150}
                stroke="none"
            >
                {data.map((entry, index) => (
                    <Cell
                        key={`cell-${index}`}
                        fill={colors[index % colors.length]}
                    />
                ))}
            </Pie>
            <Tooltip
                contentStyle={{
                    padding: '4px 8px',
                    boxShadow: 'rgba(0, 0, 0, 0.07) 0px 4px 12px',
                    borderRadius: '4px',
                    backgroundColor: 'var(--secondary-color)',
                    border: '1px solid var(--border-color-inverted)',
                }}
                itemStyle={{
                    color: 'var(--text-color-inverted)',
                    fontSize: '14px',
                    fontFamily: 'inherit',
                    opacity: '0.9',
                }}
                formatter={renderTooltiContent}
            />
        </PieChart>
    );
};

export default PieChartWithPaddingAngle;
