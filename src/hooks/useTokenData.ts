import { useEffect, useState } from 'react';
import axios from 'axios';
import { useMainFrame } from '@/contexts/MainFrameProvider';

type TokenData = {
  schemaVersion: string;
  pairs: []
};

export const useTokenData = () => {
  const [tokenData, setTokenData] = useState<TokenData | null>(null);
  const [tokenChartData, setTokenChartData] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { update } = useMainFrame()

  const generateTimeSeriesData = (pairData) => {
    const now = Date.now();
    const hourInMs = 3600000;
    const basePrice = parseFloat(pairData.priceUsd);
    
    // Calculate prices based on percentage changes
    const h1Change = parseFloat(pairData.priceChange.h1) / 100;
    const h24Change = parseFloat(pairData.priceChange.h24) / 100;
    
    // Generate hourly data points
    const timeseriesData = [];
    
    // Generate 24 hourly points
    for (let i = 24; i >= 0; i--) {
      const timestamp = now - (i * hourInMs);
      let price;
      
      if (i === 0) {
        price = basePrice;
      } else if (i === 1) {
        price = basePrice / (1 + h1Change);
      } else {
        // Interpolate price based on h24 change
        const progressToH24 = i / 24;
        price = basePrice / (1 + (h24Change * progressToH24));
      }
      
      const hourlyVolume = i === 0 
        ? parseFloat(pairData.volume.h1) 
        : parseFloat(pairData.volume.h24) / 24;
  
      timeseriesData.push({
        timestamp: Math.floor(timestamp / 1000), // Convert to Unix timestamp
        priceUsd: price,
        volumeUsd: hourlyVolume
      });
    }
  
    return timeseriesData;
  };

  const fetchTokenChartData = async (tokenAddress: string) => {
    try {
      const response = await fetch(
        `https://api.dexscreener.com/latest/dex/tokens/${tokenAddress}`
      );
      const data = await response.json();

      if (!data.pairs || data.pairs.length === 0) {
        throw new Error('No pairs found for this token');
      }

      const mostLiquidPair = data.pairs.reduce((prev, current) => {
        const prevLiquidity = parseFloat(prev.liquidity?.usd || 0);
        const currentLiquidity = parseFloat(current.liquidity?.usd || 0);
        return prevLiquidity > currentLiquidity ? prev : current;
      });

      setTokenChartData({
        data: generateTimeSeriesData(mostLiquidPair)});
    } catch (error) {
      console.error('Error fetching pair data:', error);
      return [];
    }
  }

  const fetchTokenData = async (tokenAddress: string) => {
    setLoading(true);
    setError(null);

    try {
      // Example API call to Dex Screener
      const response = await axios.get(
        `https://api.dexscreener.com/latest/dex/search?q=${tokenAddress}`
      );

      const data = response.data;
      
      setTokenData({
        schemaVersion: data.schemaVersion,
        pairs: data.pairs
      });
    } catch (err: any) {
      setError('Failed to fetch token data. Ensure the token is available on DEXs.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    update(tokenData, tokenChartData);
  }, [tokenData, tokenChartData])

  return { tokenData, fetchTokenData, loading, error, fetchTokenChartData, tokenChartData };
};
