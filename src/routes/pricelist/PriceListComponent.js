import React, { useState, useEffect, useContext } from 'react';
import { createUseStyles } from 'react-jss';
import { StoreContext } from "../../context/store/storeContext";
import LoadingComponent from '../../components/loading';
import * as apiServices from '../../resources/api';

const useStyles = createUseStyles({

    cardsContainer: {
        marginRight: -30,
        marginTop: -30
    },
    cardRow: {
        marginTop: 30,
        '@media (max-width: 768px)': {
            marginTop: 0
        },
        flex: 0.6
    },
    miniCardContainer: {
        flexGrow: 1,
        marginRight: 30,
        '@media (max-width: 768px)': {
            marginTop: 30,
            maxWidth: 'none'
        }
    },
    todayTrends: {
        marginTop: 30
    },
    lastRow: {
        marginTop: 30
    },
    unresolvedTickets: {
        marginRight: 30,
        '@media (max-width: 1024px)': {
            marginRight: 0
        }
    },
    tasks: {
        marginTop: 0,
        '@media (max-width: 1024px)': {
            marginTop: 30
        }
    }
});

function PriceListComponent() {
    const classes = useStyles();
    const { actions, state } = useContext(StoreContext);

    const [prices, setPrices] = useState();

    useEffect(() => {
        const fetchData = async () => {
            actions.generalActions.setisbusy()
            await apiServices.getPricingList()
                .then(res => {
                    setPrices(res.data)
                    actions.generalActions.resetisbusy();
                })
                .catch(err => console.log(err.response))
        }
        fetchData().catch(console.error);
    }, []);

    if (state.generalStates.isBusy) {
        return <LoadingComponent loading />
    }

    return (
        prices ? (
            <div>
                <table style={{ width: '100%' }}>
                    <caption>Light And Dark Shirt Pricing:</caption>
                    <tr >
                        <td></td>
                        {prices.shirtColorQuantities.map(item => {
                            return <th style={{ textAlign: 'left' }} scope="col">{item}C</th>
                        })}
                    </tr>
                    {prices.shirtPricingBuckets.map(item => {
                        return (
                            <tr>
                                <th style={{ textAlign: 'center' }} scope="row">{item.shirtQuantityBucket}</th>
                                {item.prices.map(itemTwo => {
                                    return (
                                        <td>
                                            {'$' + (Math.round(itemTwo.price * 100) / 100).toFixed(2)}
                                        </td>
                                    )
                                })}
                            </tr>
                        )
                    })
                    }
                </table >
                <br />
                <br />
                <table style={{ width: '100%' }}>
                    <caption>Embroidery Pricing:</caption>
                    <tr >
                        <td></td>
                        {prices.embroideryStitchBuckets.map(item => {
                            return <th align='left' scope="col">{item}</th>
                        })}
                    </tr>
                    {prices.embroideryPricingBuckets.map(item => {
                        return (
                            <tr>
                                <th style={{ textAlign: 'center' }} scope="row">{item.embroideryQuantityBucket}</th>
                                {item.prices.map(itemTwo => {
                                    return (
                                        <td>
                                            {'$' + (Math.round(itemTwo.price * 100) / 100).toFixed(2)}
                                        </td>
                                    )
                                })}
                            </tr>
                        )
                    })
                    }
                </table >
            </div>
        )
            : null
    );
}

export default PriceListComponent;
