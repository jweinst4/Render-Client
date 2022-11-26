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

function LeaguesComponent() {
    const classes = useStyles();
    const { actions, state } = useContext(StoreContext);
    const {
        register,
        formState: { errors },
        handleSubmit,
        reset
    } = useForm({
        mode: "onBlur",
    });

    const {
        register: register2,
        formState: { errors: errors2 },
        handleSubmit: handleSubmit2,
        reset: reset2
    } = useForm({
        mode: "onBlur",
    });

    useEffect(() => {
        const fetchData = async () => {
            actions.generalActions.setisbusy()
            await apiServices.getUserById(state.generalStates.user.id, state.generalStates.user.accessToken)
                .then(res => {
                    actions.generalActions.setUser(res.data)
                    actions.generalActions.resetisbusy();
                })
                .catch(err => console.log(err.response))
        }

        fetchData().catch(console.error);

    }, []);


    if (state.generalStates.isBusy) {
        return <LoadingComponent loading />
    }

    const renderLeagueDetails = (leagueId) => {
        const leagueDesc = state.generalStates.user.leaguedetails.find(element => element.testings === leagueId)
        const registrants = state.generalStates.user.leaguedetails.filter(detail => detail.testings === leagueId);

        if (leagueDesc && registrants) {
            return <CardComponent
                title={leagueDesc.name}
                link='View details'
                subtitle={`Id: ${leagueId}`}
                subtitleTwo={`Registrants: ${registrants.length}`}
                items={
                    registrants.map((registrant) => (
                        <Row alignSelf='stretch' key={leagueId + registrant.email + Math.floor(Math.random() * 1000)} >{registrant.email} </Row>
                    ))}
            >
            </CardComponent >
        }
        else {
            return null
        }
    }

    return (
        <Column>
            <ToastContainer />
            <Row
                breakpoints={{ 384: 'column' }}
            >
                <Row style={{ flex: .3 }}>
                    Create League - League Name:
                </Row>
                <Row style={{ flex: .7 }}>
                    <form id='createLeagueForm' style={{ backgroundColor: 'yellow' }} onSubmit={handleSubmit(async (data) => await apiServices.createLeague(state.generalStates.user.accessToken, state.generalStates.user.id, data.leagueName)
                        .then(res => {
                            actions.generalActions.setUser(res.data)
                            reset();
                            toast('Succesfully Created A League', {
                                position: "top-right",
                                autoClose: 2000,
                                hideProgressBar: true,
                                type: "success",
                                theme: "light",
                            });
                        })
                        .catch(err => {
                            console.log(err.response)
                            reset();
                            toast('Unable To Create This League', {
                                position: "top-right",
                                autoClose: 2000,
                                hideProgressBar: true,
                                type: "error",
                            });
                        }))}>

                        <input id='createLeague' {...register('leagueName', { required: true })} />
                        <input type="submit" />
                    </form>

                </Row>
            </Row>
            <Row
                breakpoints={{ 384: 'column' }}
            >
                <Row style={{ flex: .3 }}>
                    Join League - League Id:
                </Row>
                <Row style={{ flex: .7 }}>
                    <form id='joinLeagueForm' onSubmit={handleSubmit2(async (data) => {
                        if (!Number.isInteger(parseInt(data.leagueId))) {
                            console.log('is an integer');
                            toast('Please Type A Valid League Id', {
                                position: "top-right",
                                autoClose: 2000,
                                hideProgressBar: true,
                                type: "warning",
                                theme: "light",
                            });
                            return
                        }
                        await apiServices.joinLeague(state.generalStates.user.accessToken, state.generalStates.user.id, data.leagueId)
                            .then(res => {
                                actions.generalActions.setUser(res.data)
                                reset2();
                                toast('Succesfully Joined A League', {
                                    position: "top-right",
                                    autoClose: 2000,
                                    hideProgressBar: true,
                                    type: "success",
                                    theme: "light",
                                });
                            })
                            .catch(err => {
                                console.log(err.response);
                                reset2();
                                toast('Unable To Join This League', {
                                    position: "top-right",
                                    autoClose: 2000,
                                    hideProgressBar: true,
                                    type: "error",
                                });
                            })
                    })}>
                        <input id='joinLeague' {...register2('leagueId', { required: true })} />
                        <input type="submit" />
                    </form>

                </Row>
            </Row>

            <Row
                className={classes.cardRow}
                breakpoints={{ 384: 'column' }}
            >
                League Count: {state.generalStates.user.league_.length}
            </Row>
            {state.generalStates.user.league_ && state.generalStates.user.league_.map ? state.generalStates.user.league_.map((league) => (
                <Row alignSelf='stretch' key={Math.floor(Math.random() * 1000)}>
                    <Column flexGrow={1}>
                        <Row
                            className={classes.cardRow}
                            breakpoints={{ 384: 'column' }}
                        >
                            {renderLeagueDetails(league)}
                        </Row>
                    </Column>
                </Row>)) : <Row
                    className={classes.cardRow}
                    breakpoints={{ 384: 'column' }}
                >
                No Leagues
            </Row>}
        </Column>
    );
}

export default LeaguesComponent;
