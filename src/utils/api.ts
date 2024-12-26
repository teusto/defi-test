import axios from 'axios';

const BASE_URL = 'https://api.coingecko.com/api/v3';

export const fetchTokenData = async (tokenAddress: string) => {
  const response = await axios.get(`${BASE_URL}/simple/token_price`, {
    params: { contract_addresses: tokenAddress },
  });
  return response.data;
};