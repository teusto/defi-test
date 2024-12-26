'use client';
import { useAuth } from '@/contexts/AuthProvider';
import Search from '../Search';
import WalletTextButton from '../WalletConnectButtons';
import styles from './header.module.scss';
import { useAccount } from 'wagmi';
import { useAppKitAccount } from "@reown/appkit/react";
import Favorites from '../Widgets/Favorites';
import Menu from '../Menu';
import { AiOutlineEye } from "react-icons/ai";
import Custom from '../Widgets/Custom';


const Header = () => {
  const { isLogged } = useAuth();
  const { status, isConnected } = useAppKitAccount()
  const { account } = useAccount()

  return (
    <div className={styles.wrapper}>
      <div className={styles.top}>
        <div className={styles.logo}>
          <AiOutlineEye size={'100%'}/>
        </div>
        <div className={styles.title}>
          <span>Experience the Ultimate Trading Platform</span>
        </div>
        <div style={{ visibility: 'hidden' }} />
      </div>
      <div className={styles.bottom}>
        <div className={styles.menu}>
          <Menu />
        </div>
        <div className={styles.text_container}>
          {isLogged ?
            <Search onSearch={() => { }} /> :
            <p>Welcome to <span className={styles.brand}>TokenSight</span>, <span className={styles.link}><WalletTextButton /></span></p>
          }
        </div>
        <div className={styles.widgets_bar}>
          <Favorites />
          <Custom />
        </div>
      </div>
    </div >
  )
}

export default Header;