import { FC } from 'react';
import styles from './TopProduct.module.scss';

interface TopProductProps {
    topOne: string;
    topOneCount: number;
    topTwo: string;
    topTwoCount: number;
    topThree: string;
    topThreeCount: number;
}

const TopProduct: FC<TopProductProps> = ({
    topOne,
    topOneCount,
    topTwo,
    topTwoCount,
    topThree,
    topThreeCount,
}) => (
    <div className={styles.topproduct}>
        <div className={styles.topone}>
            <p className={styles.topone__productname}>{topOne}</p>
            <p className={styles.topone__productcount}>{topOneCount} sold</p>
        </div>
        <div className={styles.toptwo}>
            <p className={styles.toptwo__productname}>{topTwo}</p>
            <p className={styles.toptwo__productcount}>{topTwoCount} sold</p>
        </div>
        <div className={styles.topthree}>
            <p className={styles.topthree__productname}>{topThree}</p>
            <p className={styles.topthree__productcount}>{topThreeCount} sold</p>
        </div>
        <div className={styles.statusbar}>
            <div className={styles.available}>
                <div className={styles.available__bar} />
            </div>
            <div className={styles.limited}>
                <div className={styles.limited__bar} />
            </div>
            <div className={styles.outofstock}>
                <div className={styles.outofstock__bar} />
            </div>
        </div>
    </div>
);

export default TopProduct;
