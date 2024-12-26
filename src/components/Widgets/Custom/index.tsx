import { useWidgets } from '@/contexts/WidgetsProvider';
import styles from './custom.module.scss';
import { useEffect, useState } from 'react';

const Custom = () => {
  return (
    <div className={styles.wrapper}>
      <span>Click here or drag a view to fix it on the header</span>
    </div>
  )
}

export default Custom;