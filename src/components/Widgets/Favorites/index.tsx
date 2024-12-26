import { useWidgets } from '@/contexts/WidgetsProvider';
import styles from './favorites.module.scss';
import { useEffect, useState } from 'react';

const Favorites = () => {
  const [favoritesCoins, setFavoritesCoin] = useState([]);
  const { favorites } = useWidgets();

  useEffect(() => {
    setFavoritesCoin(favorites)
  }, [favorites])

  if (favoritesCoins.length == 0) {
    return (
      <div className={styles.wrapper}>
        <span>No favorites yet</span>
      </div>
    )
  }
  return (
    <div className={styles.wrapper}>
      {favoritesCoins.map((coin, index) =>
        <div className={styles.fav_coin} key={index}>
          <img src={coin?.img}/>
        </div>)}
    </div>
  )
}

export default Favorites;