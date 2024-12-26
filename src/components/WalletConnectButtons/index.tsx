"use client"
import { useAuth } from '@/contexts/AuthProvider';
import styles from './walletconnectbutton.module.scss';
import { useAppKit, useAppKitEvents } from '@reown/appkit/react'
import { useRouter } from 'next/navigation'
import { FormEvent } from 'react';
import { useAccountEffect } from 'wagmi'

const WalletTextButton = () => {
  const router = useRouter();
  const { open } = useAppKit();
  const { user, createNewUserSession } = useAuth()
  

  useAccountEffect({
    onConnect(data){
      createNewUserSession(data);
    }
  })

  return (
    <div className={styles.wrapper}>
      <button type='submit' onClick={() => open({view: 'Connect'})}>
        <span className={styles.text}>connect your wallet to start</span>
      </button>
    </div>
  )
}

export default WalletTextButton;