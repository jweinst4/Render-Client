import React, { useState, useEffect, useContext } from 'react';
import { Column, Row } from 'simple-flexbox';
import { createUseStyles } from 'react-jss';
import CardComponent from 'components/cards/CardComponent';
import { StoreContext } from "../../context/store/storeContext";

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
    const [leagues, setLeagues] = useState(0);
    const { actions } = useContext(StoreContext);

    useEffect(() => {
        actions.generalActions.setisbusy()
        const getUserById = async () => {
            const url = process.env.REACT_APP_SERVER_URL + "users/335a84d2-003a-4672-bbbd-491ed116159c"
            const response = await fetch(url,
                {
                    method: "GET",
                    headers: {
                        "access-control-allow-origin": "*",
                        "Content-type": "application/json; charset=UTF-8"
                    }
                });
            const data = await response.json();
            setLeagues(data);
            actions.generalActions.resetisbusy()
        }
        getUserById()
    }, []);

    function logout() {
        actions.generalActions.logout()
    }

    return (
        <Column>
            <Row alignSelf='stretch'>
                <Column flexGrow={1}>
                    <Row
                        className={classes.cardRow}
                        breakpoints={{ 384: 'column' }}
                        onClick={logout}
                    >
                        <span >Logout</span>
                    </Row>
                </Column>
            </Row>
            <Row alignSelf='stretch'>
                <Column flexGrow={1}>
                    <Row
                        className={classes.cardRow}
                        breakpoints={{ 384: 'column' }}
                    >
                        <span>Header</span>
                    </Row>
                </Column>
            </Row>
            {leagues && leagues.map ? leagues.map((league) => (
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
                </Row>)) : null}
        </Column>
    );
}

export default LeaguesComponent;
