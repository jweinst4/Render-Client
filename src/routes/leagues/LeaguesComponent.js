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
                if (JSON.stringify(res.data) === JSON.stringify(state.generalStates.user)) {
                    console.log('no need to update user')
                    console.log(state.generalStates.user)
                    console.log(res.data);
                }
                else {
                    console.log('need to update user')
                }
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
                onClick={() => {

                }}
            >
                Add League
            </Row>
            {state.generalStates.user.leagues && state.generalStates.user.leagues.map ? state.generalStates.user.leagues.map((league) => (
                <Row alignSelf='stretch' key={league.name + league.commander}>
                    <Column flexGrow={1}>
                        <Row
                            className={classes.cardRow}
                            breakpoints={{ 384: 'column' }}
                        >
                            <CardComponent
                                title={league.name && league.season ? league.name + " Season " + league.season : null}
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
