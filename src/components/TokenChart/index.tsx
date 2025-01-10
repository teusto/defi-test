import React, { useMemo, useState } from 'react';
import {
    LineChart,
    Line,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    LabelList
} from 'recharts';


const TokenChart = ({ pairData }) => {
    const [timeframe, setTimeframe] = useState('24h');

    const filteredData = useMemo(() => {
        if (!Array.isArray(pairData?.data)) return [];

        const now = Date.now() / 1000; // Current time in seconds
        const timeframeSeconds = {
            '24h': 24 * 60 * 60,
            '4h': 4 * 60 * 60,
            '1h': 60 * 60
        };

        return pairData.data.filter(dataPoint =>
            dataPoint.timestamp >= now - timeframeSeconds[timeframe]
        );
    }, [pairData, timeframe]);

    const formatTimestamp = (timestamp) => {
        const date = new Date(timestamp * 1000);
        return timeframe === '24h'
            ? date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            : date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    const formatPrice = (value) => {
        if (typeof value !== 'number') return '0';
        return new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD',
          minimumFractionDigits: 2,
          maximumFractionDigits: 6
        }).format(value);
      };

    const formatVolume = (value) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            notation: 'compact',
            maximumFractionDigits: 1
        }).format(value);
    };

    const yAxisPriceFormatter = (value) => {
        if (value === 0) return '0';
        if (value < 0.01) return value.toExponential(2);
        return formatPrice(value).replace('$', '');
      };

    if (!pairData) {
        return <span>Loading ...</span>
    }
    console.log({filteredData})

    return (
        <div>
            <div>
                <button onClick={() => setTimeframe('24h')}>24h</button>
                <button onClick={() => setTimeframe('4h')}>4h</button>
                <button onClick={() => setTimeframe('1h')}>1h</button>
            </div>


            <ResponsiveContainer width={"100%"} height={"100%"} aspect={3}>
                <LineChart
                    width={500}
                    height={300}
                    data={filteredData}
                    margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="timestamp" tickFormatter={formatTimestamp} minTickGap={50} />
                    <YAxis tickFormatter={yAxisPriceFormatter} domain={['auto', 'auto']}/>
                    <Line type="monotone" dataKey="priceUsd" name="Price" stroke="#8884d8" strokeWidth={2} />
                </LineChart>
            </ResponsiveContainer>

        </div>
    )
}

export default TokenChart