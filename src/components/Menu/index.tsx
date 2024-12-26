import styles from './menu.module.scss';

const Menu = () => {
    return (
      <div className={styles.wrapper}>
        <nav className={styles.navigation}>
            <div className={styles.link}>Home</div>
            <div className={styles.link}>Portfolio</div>
            <div className={styles.link}>Trade</div>
            <div className={styles.link}>Rewards</div>
        </nav>
      </div>
    )
  }
  
  export default Menu;