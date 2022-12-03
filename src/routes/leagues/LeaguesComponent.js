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
import { FaToolbox } from "react-icons/fa";

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

    const displayToast = (message, type) => {
        toast(message, {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: true,
            type: type,
            theme: "light",
        });
    }

    const renderLeagues = () => {
        return state.generalStates.user.leagues.map(league => {
            return (
                <Row alignSelf='stretch'>
                    <Column flexGrow={1}>
                        <Row className={classes.cardRow} breakpoints={{ 384: "column" }} >
                            <CardComponent
                                title={league.name}
                                link='View details'
                                subtitle={`Id: ${league.id}`}
                                subtitleTwo={`Registrants: ${league.registrants.length}`}
                                subtitleThree={league.start_date ? `Start Date: ${league.start_date}` : 'Start Date: None Yet'}
                                subtitleFour={league.end_date ? `End Date: ${league.end_date}` : 'End Date: None Yet'}
                                subtitleFive={league.deck_reveal_date ? `Deck Reveal Date: ${new Date(Date.parse(league.deck_reveal_date))}` : 'Deck Reveal Date: None Yet'}
                                items={
                                    league.registrants.map((registrant) => (
                                        <Row vertical='center'>
                                            <Column flex={.49}>
                                                <span>{registrant.email ? registrant.email : "No Email"} </span>
                                            </Column>
                                            <Column flex={.02}>
                                                {registrant.user_id === league.admin_id ? <FaToolbox /> : null}
                                            </Column>
                                            <Column flex={.49}>
                                                <Row vertical='center'>
                                                    {registrant.email === state.generalStates.user.email ?
                                                        registrant.deck_name ?
                                                            <span>
                                                                <AwesomeButton type="primary" size="large">{registrant.deck_name}
                                                                </AwesomeButton>
                                                            </span> :
                                                            <span>
                                                                <AwesomeButton type="primary" size="large">
                                                                    Submit Your Deck
                                                                </AwesomeButton>
                                                            </span>
                                                        :
                                                        !registrant.deck_reveal_date ?
                                                            <span>
                                                                <AwesomeButton type="secondary" size="large"
                                                                    onPress={() =>
                                                                        displayToast('Awaiting Admin To Set Deck Reveal Date', 'warning')
                                                                    }
                                                                >
                                                                    <FaLock />
                                                                </AwesomeButton>
                                                            </span>
                                                            : registrant.deck_reveal_date < Date.now() ?
                                                                <span>
                                                                    Deck Reveal Date Already - Show Lists
                                                                </span>
                                                                :
                                                                <span>
                                                                    <AwesomeButton type="secondary" size="large"
                                                                        onPress={() =>
                                                                            displayToast('Awaiting Deck Reveal Date', 'warning')
                                                                        }
                                                                    >
                                                                        <FaLock />
                                                                    </AwesomeButton>
                                                                </span>
                                                    }
                                                </Row>
                                            </Column>
                                        </Row>
                                    ))}>
                            </CardComponent >
                        </Row>
                    </Column>
                </Row>)
        })
    }

    const renderCreateLeague = () => {
        return (
            <Row breakpoints={{ 384: 'column' }}>
                <Row style={{ flex: .3 }}>
                    Create League - League Name:
                </Row>
                <Row style={{ flex: .7 }}>
                    <form id='createLeagueForm' onSubmit={handleSubmit(async (data) => await apiServices.createLeague(state.generalStates.user.accessToken, state.generalStates.user.id, data.leagueName)
                        .then(res => {
                            actions.generalActions.setUser(res.data)
                            reset();
                            displayToast('Successfully Created A League', 'success')
                        })
                        .catch(err => {
                            console.log(err.response)
                            reset();
                            displayToast(err.response.data.message, 'error')
                        }))}>
                        <input id='createLeague' {...register('leagueName', { required: true })} />
                        <AwesomeButton size="large" type="secondary">
                            Create League
                        </AwesomeButton>
                    </form>
                </Row>
            </Row>
        )
    }

    const renderJoinLeague = () => {
        return (
            <Row breakpoints={{ 384: 'column' }}>
                <Row style={{ flex: .3 }}>
                    Join League - League Id:
                </Row>
                <Row style={{ flex: .7 }}>
                    <form id='joinLeagueForm' onSubmit={
                        handleSubmit2(async (data) => {
                            var regex = /^[0-9]+$/;
                            if (!data.leagueId.match(regex)) {
                                displayToast('Please Enter A Valid League Id', 'warning')
                                reset2();
                                return;
                            }
                            await apiServices.joinLeague(state.generalStates.user.accessToken, state.generalStates.user.id, data.leagueId)
                                .then(res => {
                                    actions.generalActions.setUser(res.data)
                                    reset2();
                                    displayToast('Succesfully Joined A League', 'success')
                                })
                                .catch(err => {
                                    reset2();
                                    displayToast(err.response.data.message, 'error')
                                })
                        })}>
                        <input id='joinLeague' {...register2('leagueId', { required: true })} />
                        <AwesomeButton size="large" type="secondary">
                            Join League
                        </AwesomeButton>
                    </form>
                </Row>
            </Row>
        )
    }

    return (
        <Column>
            <ToastContainer />
            {renderCreateLeague()}
            <br />
            {renderJoinLeague()}
            <Row
                className={classes.cardRow}
                breakpoints={{ 384: 'column' }}
            >
                League Count: {state.generalStates.user.leagues.length}
            </Row>
            {renderLeagues()}
        </Column>
    );
}

export default LeaguesComponent;
