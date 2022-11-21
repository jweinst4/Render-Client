import React, { useState, useEffect, useContext } from 'react';
import { Column, Row } from 'simple-flexbox';
import { createUseStyles } from 'react-jss';
import CardComponent from 'components/cards/CardComponent';
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
        }
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

    useEffect(async () => {
        actions.generalActions.setisbusy()
        await apiServices.getUserById(state.generalStates.user.id, state.generalStates.user.accessToken)
            .then(res => {
                actions.generalActions.setUser(res.data)
                actions.generalActions.resetisbusy()
            })
            .catch(err => console.log(err.response))
    }, []);


    if (state.generalStates.isBusy) {
        return <LoadingComponent loading />
    }

    return (
        <Column>
            <Row
                className={classes.cardRow}
                breakpoints={{ 384: 'column' }}
                onClick={async () => {
                    await apiServices.createLeague(state.generalStates.user.accessToken, state.generalStates.user.id, 'Tester')
                        .then(res => {
                            actions.generalActions.setUser(res.data)
                        })
                        .catch(err => console.log(err.response))
                }}
            >
                Add League
            </Row>
            <Row
                className={classes.cardRow}
                breakpoints={{ 384: 'column' }}
            >
                League Count: {state.generalStates.user.leagues.length}
            </Row>
            {state.generalStates.user.leagues && state.generalStates.user.leagues.map ? state.generalStates.user.leagues.map((league) => (
                <Row alignSelf='stretch' key={league.id}>
                    <Column flexGrow={1}>
                        <Row
                            className={classes.cardRow}
                            breakpoints={{ 384: 'column' }}
                        >
                            <CardComponent
                                title={league.name && league.id ? league.name + "-" + league.id : null}
                                link='View details'
                                subtitle='Commander:'
                                subtitleTwo={league.commander ? league.commander : null}
                                items={[
                                    <Row horizontal='space-between' vertical='center'>
                                        {league.result ? <span>Result: {league.result}</span> : null}
                                        {league.pointspermatch ? <span>Points Per Match: {league.pointspermatch}</span> : null}
                                        {league.url ? <span>Moxfield URL: {league.url}</span> : null}
                                    </Row>

                                ]}
                            />
                        </Row>
                    </Column>
                </Row>)) : <Row
                    className={classes.cardRow}
                    breakpoints={{ 384: 'column' }}
                    onClick={() => {

                    }}
                >
                No Leagues
            </Row>}
        </Column>
    );
}

export default LeaguesComponent;
