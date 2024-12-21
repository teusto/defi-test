import Search from '../Search';
import styles from './mainframe.module.scss';

const MainFrame = () => {
    return (
      <div className={styles.wrapper}>
        <Search />
      </div>
    )
  }
  
  export default MainFrame;