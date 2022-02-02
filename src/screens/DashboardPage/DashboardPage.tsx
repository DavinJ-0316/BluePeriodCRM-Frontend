import Chart from './components/Chart';
import Info from './components/Info';
// import TopProduct from './components/TopProduct';

const DashboardPage = () => (
    <div>
        <Info />
        <Chart />
        {/* <TopProduct
            topOne="iPhone 12 Pro Max"
            topOneCount={1599}
            topTwo="Nintendo switch console OLED WHITE"
            topTwoCount={1226}
            topThree="Play Station 5"
            topThreeCount={900}
        /> */}
    </div>
);

export default DashboardPage;
