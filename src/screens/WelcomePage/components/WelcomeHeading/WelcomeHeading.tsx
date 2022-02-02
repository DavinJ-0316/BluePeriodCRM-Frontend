import * as react from 'react';
import styles from './welcomeHeading.module.scss';
import MainIcon from '../../../../assets/images/logos/logoColorNoBG.png';

const WelcomeHeading: react.FC = () => (
    <div className={styles.welcomeHeading}>
        <div className={styles.logo}>
            <img src={MainIcon} alt="mainicon" />
        </div>
    </div>
);

export default WelcomeHeading;
