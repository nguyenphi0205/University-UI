import React, { PureComponent } from 'react';
import Grid from '@material-ui/core/Grid';
import 'containers/Manager/Manager.css'
import axios from 'axios'
import {
    PieChart, Pie, Sector, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';

const data2 = [
    { name: 'Physics & Chemistry', pv: 240 },
    { name: 'Engineering', pv: 139 },
    { name: 'Earth Sciences & Geography', pv: 580 },
    { name: 'Business & Management', pv: 398 },
    { name: 'Computer Science & Technology', pv: 480 },
    { name: 'Human, Social and Political Science', pv: 380 },
    { name: 'Philosophy', pv: 500 },
    { name: 'English', pv: 130 },
    { name: 'Economics', pv: 436 },
    { name: 'Law', pv: 730 },
    { name: 'Music', pv: 330 },

];
const getIntroOfPage = (label) => {
   
    if (label === 'Physics & Chemistry') {
        return "number student of Physics & Chemistry";
    } if (label === 'Engineering') {
        return "number student of Engineering";
    } if (label === 'Earth Sciences & Geography') {
        return "number student of Earth Sciences & Geography";
    } if (label === 'Business & Management') {
        return 'number student of Business & Management';
    } if (label === 'Computer Science & Technology') {
        return 'number student of Computer Science & Technology';
    } if (label === 'Human, Social and Political Science') {
        return 'number student of Human, Social and Political Science';
    } if (label === 'Philosophy') {
        return 'number student of Philosophy';
    } if (label === 'English') {
        return 'number student of English';
    } if (label === 'Law') {
        return 'number student of Law';
    } if (label === 'Economics') {
        return 'number student of Economics';
    } if (label === 'Music') {
        return 'number student of Music';
    }
};

const CustomTooltip = ({ active, payload, label }) => {
    if (active) {
        return (
            <div className="custom-tooltip">
                <p className="label">{`${label} : ${payload[0].value}`}</p>
                <p className="intro">{getIntroOfPage(label)}</p>
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
            <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill="#333">{`File number ${value}`}</text>
            <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={18} textAnchor={textAnchor} fill="#999">
                {`(Rate ${(percent * 100).toFixed(2)}%)`}
            </text>
        </g>
    );
};


export default class Statistic extends PureComponent {
    state = {
        activeIndex: 0,
        data: [],
        data2: []
    };

    onPieEnter = (data, index) => {
        this.setState({
            activeIndex: index,
        });
    };
    getData() {
        const url = 'https://stormy-thicket-83266.herokuapp.com/api/pieChart/'
        const url2 = 'https://stormy-thicket-83266.herokuapp.com/api/BarChart/';
        axios.get(url).then(res => {
            let fileArray = [];
            fileArray.push(res.data)
            return fileArray.map(data => this.setState({ data }))
        })
        axios.get(url2).then(res => {
            let fileArray = [];
            fileArray.push(res.data)
            return fileArray.map(data2 => this.setState({ data2 }))
        })
    }
    componentDidMount() {
        this.getData();

    }
    render() {
      
        return (
            <div className="statistic-div">
                <Grid container spacing={24}>
                     <p className="text-statistic"><em>Statistics of the number of faculty students</em></p>
                    <Grid item xs={12} sm={12} md={12} lg={12}>
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
                    <Grid item xs={12} sm={12} md={6} lg={6}>

                    </Grid>
                </Grid>
                <Grid container spacing={24}>
                     <p className="text-statistic"><em>Statistics of the number of file uploaded by students </em></p>
                     <Grid item xs={12} sm={12} md={12} lg={12}>
                        <PieChart width={500} height={500}>
                            <Pie
                                activeIndex={this.state.activeIndex}
                                activeShape={renderActiveShape}
                                data={this.state.data}
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