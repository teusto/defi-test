"use client"
import { useTokenData } from '@/hooks/useTokenData';
import ListingTokens from '../ListingTokens';
import styles from './mainframe.module.scss';

const MainFrame = () => {
  return (
      <div className={styles.wrapper}>
        <ListingTokens />
      </div>
  )
}

export default MainFrame;