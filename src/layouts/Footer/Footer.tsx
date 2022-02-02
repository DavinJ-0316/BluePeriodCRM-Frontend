import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import YouTubeIcon from '@mui/icons-material/YouTube';
import classes from './Footer.module.scss';

const Footer = () => (
    <footer className={classes.footer}>
        <div className={classes.footer__footerItem}>
            <ul>
                <li>Devils&copy;2022</li>
                <li>Privacy</li>
                <li>Terms</li>
            </ul>
        </div>
        <div className={classes.footer__footerItem}>
            <ul>
                <li>
                    <FacebookIcon fontSize="large" />
                </li>
                <li>
                    <TwitterIcon fontSize="large" />
                </li>
                <li>
                    <InstagramIcon fontSize="large" />
                </li>
                <li>
                    <YouTubeIcon fontSize="large" />
                </li>
            </ul>
        </div>
    </footer>
);

export default Footer;
