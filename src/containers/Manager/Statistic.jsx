import React, { PureComponent } from 'react';
import Grid from '@material-ui/core/Grid';
import 'containers/Manager/Manager.css'
import {
    PieChart, Pie, Sector, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';

const data = [
    { name: 'Group A', value: 400 },
    { name: 'Group B', value: 300 },
    { name: 'Group C', value: 300 },
    { name: 'Group D', value: 200 },
];
const data2 = [
    { name: 'Page A', pv: 2400 },
    { name: 'Page B', pv: 1398 },
    { name: 'Page C', pv: 9800 },
    { name: 'Page D', pv: 3908 },
    { name: 'Page E', pv: 4800 },
    { name: 'Page F', pv: 3800 },
    { name: 'Page G', pv: 4300 },
];
const getIntroOfPage = (label) => {
    if (label === 'Page A') {
        return "Page A is about men's clothing";
    } if (label === 'Page B') {
        return "Page B is about women's dress";
    } if (label === 'Page C') {
        return "Page C is about women's bag";
    } if (label === 'Page D') {
        return 'Page D is about household goods';
    } if (label === 'Page E') {
        return 'Page E is about food';
    } if (label === 'Page F') {
        return 'Page F is about baby food';
    }
};

const CustomTooltip = ({ active, payload, label }) => {
    if (active) {
        return (
            <div className="custom-tooltip">
                <p className="label">{`${label} : ${payload[0].value}`}</p>
                <p className="intro">{getIntroOfPage(label)}</p>
                <p className="desc">Anything you want can be displayed here.</p>
            </div>
        );
    }
    return null;
};

const renderActiveShape = (props) => {
    const RADIAN = Math.PI / 180;
    const {
        cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle,
        fill, payload, percent, value,
    } = props;
    const sin = Math.sin(-RADIAN * midAngle);
    const cos = Math.cos(-RADIAN * midAngle);
    const sx = cx + (outerRadius + 10) * cos;
    const sy = cy + (outerRadius + 10) * sin;
    const mx = cx + (outerRadius + 30) * cos;
    const my = cy + (outerRadius + 30) * sin;
    const ex = mx + (cos >= 0 ? 1 : -1) * 22;
    const ey = my;
    const textAnchor = cos >= 0 ? 'start' : 'end';

    return (
        <g>
            <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>{payload.name}</text>
            <Sector
                cx={cx}
                cy={cy}
                innerRadius={innerRadius}
                outerRadius={outerRadius}
                startAngle={startAngle}
                endAngle={endAngle}
                fill={fill}
            />
            <Sector
                cx={cx}
                cy={cy}
                startAngle={startAngle}
                endAngle={endAngle}
                innerRadius={outerRadius + 6}
                outerRadius={outerRadius + 10}
                fill={fill}
            />
            <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" />
            <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
            <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill="#333">{`PV ${value}`}</text>
            <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={18} textAnchor={textAnchor} fill="#999">
                {`(Rate ${(percent * 100).toFixed(2)}%)`}
            </text>
        </g>
    );
};


export default class Statistic extends PureComponent {
    state = {
        activeIndex: 0,
    };

    onPieEnter = (data, index) => {
        this.setState({
            activeIndex: index,
        });
    };

    render() {
        return (
            <div className="statistic-div">
                <Grid container spacing={40}>
                    <Grid item xs={12}>
                        <BarChart
                            width={500}
                            height={300}
                            data={data2}
                            margin={{
                                top: 5, right: 30, left: 20, bottom: 10,
                            }}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip content={<CustomTooltip />} />
                            <Legend />
                            <Bar dataKey="pv" barSize={20} fill="#8884d8" />
                        </BarChart>
                    </Grid>
                    <Grid item xs={12}>
                        <PieChart width={500} height={500}>
                            <Pie
                                activeIndex={this.state.activeIndex}
                                activeShape={renderActiveShape}
                                data={data}
                                cx={200}
                                cy={200}
                                innerRadius={60}
                                outerRadius={80}
                                fill="#8884d8"
                                dataKey="value"
                                onMouseEnter={this.onPieEnter}
                            />
                        </PieChart>
                    </Grid>
                </Grid>


            </div>

        );
    }
}