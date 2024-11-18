import styles from './Footer.module.css';

const Footer=()=> {
  return (
    <footer className={styles.footer}>
      <p>© {new Date().getFullYear()} Smart Yoga</p>
    </footer>
  );
}


export default Footer;