import styles from './header.module.scss';

const Header = () => {
    return (
      <div className={styles.wrapper}>
        <div className={styles.top}>
            <div className={styles.logo}></div>
            <div className={styles.title}>
                <span>some catchprase here</span>
            </div>
            <div>menu</div>
        </div>
        <div className={styles.bottom}>
            <div className={styles.text_container}>
                <p>Welcome to <span className={styles.brand}>TokenSight</span>, <span className={styles.link}>connect your wallet to start</span></p>
            </div>
        </div>
      </div>
    )
  }
  
  export default Header;