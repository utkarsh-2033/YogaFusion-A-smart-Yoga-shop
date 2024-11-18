import Navbar from './Navbar';
import Footer from './Footer';
import styles from './Layout.module.css';

 const Layout=({ children })=> {
  return (
    <div>
      <Navbar />
      <main className={styles.main}>{children}</main>
      <Footer />
      
      <style jsx global>{`
        body {
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif, 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji';
          background-color: #f0f0f0;
        }
      `}</style>
    </div>
  );
}


export default Layout;