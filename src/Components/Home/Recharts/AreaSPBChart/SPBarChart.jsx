import React, { useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';
import { ThemeContext } from '../../../../ConText/ThemeConText';
import { LIGHT_THEME } from '../../../../ConsTants/ThemeConsTants';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    Legend,
    ResponsiveContainer,
} from 'recharts';

const data = [
    { month: 'January', loss: 200, profit: 350 },
    { month: 'February', loss: 150, profit: 420 },
    { month: 'March', loss: 300, profit: 230 },
    { month: 'April', loss: 400, profit: 310 },
    { month: 'May', loss: 250, profit: 280 },
    { month: 'June', loss: 320, profit: 390 },
    { month: 'July', loss: 180, profit: 410 },
    { month: 'August', loss: 270, profit: 340 },
    { month: 'September', loss: 340, profit: 290 },
    { month: 'October', loss: 230, profit: 370 },
    { month: 'November', loss: 190, profit: 420 },
    { month: 'December', loss: 310, profit: 300 },
];

function SPBarChart() {
    const { theme, toggleTheme } = useContext(ThemeContext);

    const formatTooltipValue = (value) => {
        return `${value}k`;
    };

    const formatYAxisLabel = (value) => {
        return `${value}k`;
    };

    const formatLegendValue = (value) => {
        return value.charAt(0).toUpperCase() + value.slice(1);
    };

    return (
        <div className="bg-slate-200 p-[16px_16px_6px_16px] rounded-md  shadow-light-shadow1 relative md:p-3">
            <div className="mb-8">
                <h5 className="mb-3 text-xl font-bold text-green-500">
                    Total Revenue
                </h5>
                <div className="flex items-center gap-x-4 ">
                    <div className="text-black-900 text-2xl font-bold">
                        $50.4K
                    </div>
                    <div className="items-center text-green-600 flex gap-x-1">
                        <FontAwesomeIcon icon={faArrowUp} />
                        <p>5% than last month.</p>
                    </div>
                </div>
            </div>
            <div className="w-full h-[240px] recharts-wrapper xl:ml-custom-left">
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                        width={500}
                        height={300}
                        data={data}
                        margin={{
                            top: 5,
                            right: 5,
                            left: 0,
                            bottom: 5,
                        }}
                    >
                        <XAxis
                            padding={{ left: 10 }}
                            dataKey="month"
                            tickSize={0}
                            axisLine={false}
                            tick={{
                                fill: `${
                                    theme === LIGHT_THEME
                                        ? '#1e40af'
                                        : '#3f6212'
                                }`,
                                fontSize: 14,
                            }}
                        />
                        <YAxis
                            padding={{ top: 10, bottom: 10 }}
                            tickFormatter={formatYAxisLabel}
                            tickCount={6}
                            tickSize={0}
                            axisLine={false}
                            tick={{
                                fill: `${
                                    theme === LIGHT_THEME
                                        ? '#1e40af'
                                        : '#3f6212'
                                }`,
                                fontSize: 14,
                            }}
                        />
                        <Tooltip
                            wrapperStyle={{
                                color: '#ef4444',
                                fontSize: '0.875rem',
                                fontWeight: '600',
                            }}
                            formatter={formatTooltipValue}
                            cursor={{ fill: 'transparent' }}
                        />
                        <Legend
                            layout="horizontal"
                            align="right"
                            verticalAlign="top"
                            wrapperStyle={{ top: -90, right: 0 }}
                            iconType="circle"
                            iconSize={10}
                            formatter={formatLegendValue}
                        />
                        <Bar
                            dataKey="profit"
                            fill="#475be8"
                            isAnimationActive={false}
                            activeBar={false}
                            barSize={24}
                            radius={[4, 4, 4, 4]}
                        />
                        <Bar
                            dataKey="loss"
                            fill="#581c87"
                            isAnimationActive={false}
                            activeBar={false}
                            barSize={24}
                            radius={[4, 4, 4, 4]}
                        />
                    </BarChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
}

export default SPBarChart;
