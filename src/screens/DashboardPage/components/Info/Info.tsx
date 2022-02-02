import { ArrowDownward, ArrowUpward } from '@mui/icons-material';
import styles from './Info.module.scss';

const Info = () => (
    <div className={styles.info}>
        <div className={styles['info-item']}>
            <span className={styles['info-item-title']}>Customer</span>
            <div className={styles['info-item-container']}>
                <span className={styles['info-item-container-data']}>1,415</span>
                <span className={styles['info-item-container-rate']}>
                    +1.4 <ArrowUpward className={styles['info-item-container-rate-icon']} />
                </span>
            </div>
            <span className={styles['info-item-subtitle']}>Compared to last month</span>
        </div>
        <div className={styles['info-item']}>
            <span className={styles['info-item-title']}>Sales</span>
            <div className={styles['info-item-container']}>
                <span className={styles['info-item-container-data']}>$4,415</span>
                <span className={styles['info-item-container-rate']}>
                    -0.4
                    <ArrowDownward className={styles['info-item-container-rate-icon-negative']} />
                </span>
            </div>
            <span className={styles['info-item-subtitle']}>Compared to last month</span>
        </div>
        <div className={styles['info-item']}>
            <span className={styles['info-item-title']}>Cost</span>
            <div className={styles['info-item-container']}>
                <span className={styles['info-item-container-data']}>$2,225</span>
                <span className={styles['info-item-container-rate']}>
                    +2.4 <ArrowUpward className={styles['info-item-container-rate-icon']} />
                </span>
            </div>
            <span className={styles['info-item-subtitle']}>Compared to last month</span>
        </div>
    </div>
);

export default Info;
