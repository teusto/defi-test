"use client"
import { useState } from 'react';
import styles from './search.module.scss';
import { useTokenData } from '@/hooks/useTokenData';
import { AiOutlineSearch } from "react-icons/ai";

const Search = ({ onSearch }) => {
  const [tokenAddress, setTokenAddress] = useState('');
  const [error, setError] = useState('');
  const [coin, setCoin] = useState(null);
  const { fetchTokenData, tokenData, fetchTokenChartData } = useTokenData();
  const [searchItem, setSearchItem] = useState('')

  const handleSearch = async () => {
    await fetchTokenData(tokenAddress);
    await fetchTokenChartData(tokenAddress);
  };

  const handleInputChange = (e) => {
    const searchTerm = e.target.value;
    setTokenAddress(searchTerm)
  }

  return (
    <div className={styles.wrapper}>
      <input
        type="text"
        value={tokenAddress}
        onChange={handleInputChange}
        placeholder='Type to search'
        className={styles.search_bar}
      />
      <button className={styles.button} onClick={handleSearch}>
        <AiOutlineSearch size={'70%'}/>
      </button>
    </div>
  )
}

export default Search;