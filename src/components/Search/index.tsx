import styles from './search.module.scss';

const Search = () => {
    return (
      <div className={styles.wrapper}>
        <div className={styles.searchbar}>
            enter your search
        </div>
        <div className={styles.button}>
            go
        </div>
      </div>
    )
  }
  
  export default Search;