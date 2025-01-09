import { useWidgets } from '@/contexts/WidgetsProvider';
import styles from './custom.module.scss';
import { useEffect, useState } from 'react';

const Custom = () => {
  return (
    <div className={styles.wrapper}>
      <span>Drag a module</span>
    </div>
  )
}

export default Custom;