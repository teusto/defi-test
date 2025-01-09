"use client"
import { useTokenData } from '@/hooks/useTokenData';
import ListingTokens from '../ListingTokens';
import styles from './mainframe.module.scss';
import TradeImage from '../../imgs/trade.jpg';
import { useAuth } from '@/contexts/AuthProvider';

const MainFrame = () => {
  const { isLogged } = useAuth();

  return (
    <div
      style={{
        backgroundImage: !isLogged && `url(${TradeImage.src})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat'
      }}
      className = { styles.wrapper }
    >
      <ListingTokens />
    </div >
  )
}

export default MainFrame;