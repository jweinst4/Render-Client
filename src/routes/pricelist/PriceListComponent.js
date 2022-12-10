import React, { useState, useEffect, useContext } from 'react';
import { Column, Row } from 'simple-flexbox';
import { createUseStyles } from 'react-jss';
import CardComponent from 'components/cards/CardComponent';
import { StoreContext } from "../../context/store/storeContext";
import LoadingComponent from '../../components/loading';
import * as apiServices from '../../resources/api';
import { ToastContainer, toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import 'react-toastify/dist/ReactToastify.css';
import { AwesomeButton } from 'react-awesome-button';
import 'react-awesome-button/dist/styles.css';
import { FaLock } from "react-icons/fa";
import { GrUserAdmin } from "react-icons/gr";
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css'; // Import css

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

    const {
        register,
        formState: { errors },
        handleSubmit,
        reset
    } = useForm({
        mode: "onBlur",
    });

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

    const renderTableItem = (shirtQuantityBucket, colorQuantity) => {
        const price = (Math.round(prices.shirtPrices.find(element => element.quantity === shirtQuantityBucket && element.colors === colorQuantity).price * 100) / 100).toFixed(2);

        if (price) {
            return price
        }
        else {
            return 0
        }
    }

    const renderEmbroideryTableItem = (shirtQuantityBucket, stitchCountBucket) => {
        const price = (Math.round(prices.embroideryPrices.find(element => element.quantity === shirtQuantityBucket && element.stitches === stitchCountBucket).price * 100) / 100).toFixed(2);

        if (price) {
            return price
        }
        else {
            return 0
        }
    }

    return (
        prices ? (
            <div>
                <table style={{ width: '100%' }}>
                    <caption>Light And Dark Shirt Pricing:</caption>
                    <tr >
                        <td></td>
                        <th align='left' scope="col">1C</th>
                        <th align='left' scope="col">2C</th>
                        <th align='left' scope="col">3C</th>
                        <th align='left' scope="col">4C</th>
                        <th align='left' scope="col">5C</th>
                        <th align='left' scope="col">6C</th>
                    </tr>
                    {['6-11', '12-36', '37-72', '73-144', '145-287', '288-499', '500-999', '1000-4999', '5000+'].map(item => {
                        return (
                            <tr>
                                <th style={{ textAlign: 'center' }} scope="row">{item}</th>
                                {[1, 2, 3, 4, 5, 6].map(itemTwo => {
                                    return (
                                        <td>{
                                            '$' + renderTableItem(item, itemTwo)
                                        }</td>
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
                        <th align='left' scope="col">1-5k</th>
                        <th align='left' scope="col">5k-7k</th>
                        <th align='left' scope="col">7k-9k</th>
                        <th align='left' scope="col">9k-11k</th>
                        <th align='left' scope="col">11k-13k</th>
                        <th align='left' scope="col">13k-15k</th>
                        <th align='left' scope="col">15k-17k</th>
                        <th align='left' scope="col">17k-19k</th>
                        <th align='left' scope="col">19k-21k</th>
                        <th align='left' scope="col">21k+</th>
                    </tr>
                    {['1-5', '6-11', '12-23', '24-47', '48-99', '100-248'].map(item => {
                        return (
                            <tr>
                                <th style={{ textAlign: 'center' }} scope="row">{item}</th>
                                {['1-4999', '5000-6999', '7000-8999', '9000-10999', '11000-12999', '13000-14999', '15000-16999', '17000-18999', '19000-20999', '21000+'].map(itemTwo => {
                                    return (
                                        <td>{
                                            '$' + renderEmbroideryTableItem(item, itemTwo)
                                        }</td>
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
