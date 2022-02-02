import { LineChart, Line, XAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import styles from './Chart.module.scss';
import userData from '../dummy';

const Chart = () => (
    <div className={styles.chart}>
        <h3 className={styles.chartTitle}>User Analytics</h3>
        <ResponsiveContainer aspect={4}>
            <LineChart data={userData}>
                <XAxis dataKey="name" stroke="#5550bd" />
                <Line type="monotone" dataKey="Active User" stroke="#5550bd" />
                <Tooltip />
                <CartesianGrid stroke="#e0dfdf" strokeDasharray="5 5" />
            </LineChart>
        </ResponsiveContainer>
    </div>
);

export default Chart;
