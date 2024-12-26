"use client"
import { useEffect, useState } from 'react';
import styles from './listingtokens.module.scss';
import { useMainFrame } from '@/contexts/MainFrameProvider';
import { formatCryptoValue, formatCryptoValueUpdate } from '@/utils/formatters';
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { useWidgets } from '@/contexts/WidgetsProvider';
import TokenChart from '../TokenChart';

const ListingTokens = () => {
    const { dataToList, dataToChart } = useMainFrame();
    const { updateFavoritesList, searchOnTheFavorites } = useWidgets();

    console.log(dataToChart)

    return (
        <div className={styles.wrapper}>

            {dataToList?.pairs?.map((pair, index) => {
                return (
                    <>
                        <div className={styles.card_container} key={index}>
                            <div className={styles.card_left}>
                                <div className={styles.image_container}><img src={pair.info.imageUrl} /></div>
                                <div className={styles.name}>
                                    <p>{pair.baseToken.name} || {pair.baseToken.symbol}</p>
                                </div>
                            </div>
                            <div className={styles.card_mid}>
                                <div className={styles.mid_top}>
                                    <p className={styles.price}>{formatCryptoValueUpdate(parseFloat(pair.priceUsd))}</p>
                                    <p className={styles.l24}><span>24h:</span>{pair.priceChange.h24}%</p>
                                </div>
                                <div className={styles.mid_bottom}>
                                    <p className={styles.cap}><span>Mkt Cap: </span> {formatCryptoValueUpdate(parseFloat(pair.marketCap))}</p>
                                    <p className={styles.fdv}><span>FDV: </span> {formatCryptoValueUpdate(parseFloat(pair.fdv))}</p>
                                    <p className={styles.liquidity}><span>Liquidity: </span> {formatCryptoValueUpdate(parseFloat(pair.liquidity.usd))}</p>
                                </div>
                            </div>
                            <div className={styles.card_right}>
                                <div className={styles.favorite} onClick={() => updateFavoritesList({ img: pair.info.imageUrl, url: pair.baseToken.address  })}>
                                    {searchOnTheFavorites() ?
                                     <AiFillHeart /> :
                                     <AiOutlineHeart /> 
                                    }
                                </div>
                            </div>
                        </div>
                        <div className={styles.bottom}>
                            <div className={styles.chart_container}>
                                <TokenChart pairData={dataToChart} />
                            </div>
                            <div className={styles.views_container}>
                                <div className={styles.view}>
                                    <p>News</p>
                                </div>
                                <div className={styles.view}>
                                    <p>Stats</p>
                                </div>
                                <div className={styles.view}>
                                    <p>Buy/Sell</p>
                                </div>
                                <div className={styles.view}>
                                    <p>Support</p>
                                </div>
                            </div>
                        </div>
                    </>
                )
            })}
        </div>
    )
}

export default ListingTokens;