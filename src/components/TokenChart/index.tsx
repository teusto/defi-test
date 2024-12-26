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

const DATATEST = [
    {
        time: 'some',
        price: 4000,
    },
    {
        time: 'som',
        price: 3550,
    },
    {
        time: 'somes',
        price: 3000,
    },
];

const TokenChart = ({ pairData }) => {
    const [timeframe, setTimeframe] = useState('24h'); // '24h', '4h', '1h'
    console.log({ pairData})

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

    const formatVolume = (value) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            notation: 'compact',
            maximumFractionDigits: 1
        }).format(value);
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


            <ResponsiveContainer width={"100%"} aspect={3}>
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
                    <XAxis dataKey="timestamp" />
                    <YAxis dataKey="volumeUsd" />
                    <Line type="monotone" dataKey="price" stroke="#FFFFFF" strokeWidth={2} />
                </LineChart>
            </ResponsiveContainer>

        </div>
    )
}

export default TokenChart