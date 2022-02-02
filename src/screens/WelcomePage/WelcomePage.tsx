import React from 'react';
import HeadingWithSection from '../../components/HeadingWithSection';
import WelcomeHeading from './components/WelcomeHeading';
import WelcomeSection from './components/WelcomeSection';
import styles from './welcomePage.module.scss';

const WelcomePage: React.FC = () => (
    <div className={styles.welcomePage}>
        <HeadingWithSection heading={<WelcomeHeading />} section={<WelcomeSection />} />
    </div>
);

export default WelcomePage;
